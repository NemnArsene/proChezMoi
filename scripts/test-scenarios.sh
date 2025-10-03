#!/bin/bash

# ProcheZMoi API Test Scenarios
# This script tests the complete flow from registration to payment

API_URL="http://localhost:3000"
MOCK_URL="http://localhost:3001"

# Generate unique identifiers for this test run
TIMESTAMP=$(date +%s)
TEST_CLIENT_EMAIL="test.client${TIMESTAMP}@example.cm"
TEST_CLIENT_PHONE="+237699${TIMESTAMP: -6}"
TEST_TECH_EMAIL="test.tech${TIMESTAMP}@example.cm"
TEST_TECH_PHONE="+237688${TIMESTAMP: -6}"

echo "======================================"
echo "ProcheZMoi API Test Scenarios"
echo "Test Run: $TIMESTAMP"
echo "======================================"
echo ""

# Color codes for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Helper function to extract JSON value
extract_json() {
  local json="$1"
  local key="$2"
  echo "$json" | grep -o "\"$key\":\"[^\"]*" | sed "s/\"$key\":\"//"
}

# Scenario 1: User Registration
echo -e "${BLUE}=== SCENARIO 1: User Registration ===${NC}"
echo "1.1 Register a new client..."
CLIENT_RESPONSE=$(curl -s -X POST $API_URL/auth/register \
  -H "Content-Type: application/json" \
  -d "{
    \"firstName\": \"Test\",
    \"lastName\": \"Client\",
    \"email\": \"$TEST_CLIENT_EMAIL\",
    \"phone\": \"$TEST_CLIENT_PHONE\",
    \"password\": \"password123\",
    \"role\": \"CLIENT\"
  }")
echo "$CLIENT_RESPONSE"
CLIENT_TOKEN=$(extract_json "$CLIENT_RESPONSE" "access_token")
CLIENT_ID=$(extract_json "$CLIENT_RESPONSE" "id")
echo -e "${GREEN}✓ Client registered with ID: $CLIENT_ID${NC}"
echo ""

echo "1.2 Register a new technician..."
TECH_RESPONSE=$(curl -s -X POST $API_URL/auth/register \
  -H "Content-Type: application/json" \
  -d "{
    \"firstName\": \"Test\",
    \"lastName\": \"Technician\",
    \"email\": \"$TEST_TECH_EMAIL\",
    \"phone\": \"$TEST_TECH_PHONE\",
    \"password\": \"password123\",
    \"role\": \"TECHNICIAN\"
  }")
echo "$TECH_RESPONSE"
TECH_TOKEN=$(extract_json "$TECH_RESPONSE" "access_token")
TECH_ID=$(extract_json "$TECH_RESPONSE" "id")
echo -e "${GREEN}✓ Technician registered with ID: $TECH_ID${NC}"
echo ""

# Scenario 2: Login and Get Users
echo -e "${BLUE}=== SCENARIO 2: Login and Authentication ===${NC}"
echo "2.1 Login as client..."
LOGIN_RESPONSE=$(curl -s -X POST $API_URL/auth/login \
  -H "Content-Type: application/json" \
  -d "{
    \"email\": \"$TEST_CLIENT_EMAIL\",
    \"password\": \"password123\"
  }")
echo "$LOGIN_RESPONSE"
echo -e "${GREEN}✓ Client logged in successfully${NC}"
echo ""

echo "2.2 Get all users..."
curl -s -X GET $API_URL/users \
  -H "Authorization: Bearer $CLIENT_TOKEN"
echo ""
echo ""

# Scenario 3: Technician Validation (Admin action)
echo -e "${BLUE}=== SCENARIO 3: Technician Validation ===${NC}"
echo "3.1 Login as admin..."
ADMIN_RESPONSE=$(curl -s -X POST $API_URL/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@prochezmoi.cm",
    "password": "password123"
  }')
ADMIN_TOKEN=$(extract_json "$ADMIN_RESPONSE" "access_token")
echo -e "${GREEN}✓ Admin logged in${NC}"
echo ""

echo "3.2 Validate the technician..."
curl -s -X PATCH $API_URL/users/$TECH_ID/technician-status \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "status": "VALIDATED"
  }'
echo ""
echo -e "${GREEN}✓ Technician validated${NC}"
echo ""

echo "3.3 Get validated technicians..."
curl -s -X GET $API_URL/users/technicians \
  -H "Authorization: Bearer $CLIENT_TOKEN"
echo ""
echo ""

# Scenario 4: Create Service Request
echo -e "${BLUE}=== SCENARIO 4: Create Service Request ===${NC}"
echo "4.1 Client creates a service request..."
ORDER_RESPONSE=$(curl -s -X POST $API_URL/orders \
  -H "Authorization: Bearer $CLIENT_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"client\": \"$CLIENT_ID\",
    \"category\": \"PLUMBING\",
    \"description\": \"Fuite d'eau dans la cuisine\",
    \"address\": {
      \"street\": \"123 Test Street\",
      \"city\": \"Douala\",
      \"postalCode\": \"00237\",
      \"coordinates\": { \"lat\": 4.0511, \"lng\": 9.7679 }
    },
    \"estimatedPrice\": 20000
  }")
echo "$ORDER_RESPONSE"
ORDER_ID=$(extract_json "$ORDER_RESPONSE" "_id")
echo -e "${GREEN}✓ Order created with ID: $ORDER_ID${NC}"
echo ""

# Scenario 5: Technician Assignment and Check-in/out
echo -e "${BLUE}=== SCENARIO 5: Assign Technician & Check-in/out ===${NC}"
echo "5.1 Assign technician to order..."
curl -s -X PATCH $API_URL/orders/$ORDER_ID/assign \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"technicianId\": \"$TECH_ID\"
  }"
echo ""
echo -e "${GREEN}✓ Technician assigned to order${NC}"
echo ""

echo "5.2 Technician checks in..."
curl -s -X PATCH $API_URL/orders/$ORDER_ID/check-in \
  -H "Authorization: Bearer $TECH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "lat": 4.0511,
    "lng": 9.7679
  }'
echo ""
echo -e "${GREEN}✓ Technician checked in${NC}"
echo ""

echo "5.3 Get order details..."
curl -s -X GET $API_URL/orders/$ORDER_ID \
  -H "Authorization: Bearer $CLIENT_TOKEN"
echo ""
echo ""

echo "5.4 Technician checks out..."
curl -s -X PATCH $API_URL/orders/$ORDER_ID/check-out \
  -H "Authorization: Bearer $TECH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "lat": 4.0511,
    "lng": 9.7679
  }'
echo ""
echo -e "${GREEN}✓ Technician checked out - Order completed${NC}"
echo ""

# Scenario 6: Payment with Mock Services
echo -e "${BLUE}=== SCENARIO 6: Payment & Mock Services ===${NC}"
echo "6.1 Initiate payment via Orange Money (mock)..."
PAYMENT_INIT=$(curl -s -X POST $MOCK_URL/api/mobile-money/orange/initiate \
  -H "Content-Type: application/json" \
  -d "{
    \"amount\": 20000,
    \"phoneNumber\": \"$TEST_CLIENT_PHONE\",
    \"orderId\": \"$ORDER_ID\"
  }")
echo "$PAYMENT_INIT"
TRANSACTION_ID=$(extract_json "$PAYMENT_INIT" "transactionId")
echo -e "${GREEN}✓ Payment initiated with transaction ID: $TRANSACTION_ID${NC}"
echo ""

echo "6.2 Create payment record in database..."
PAYMENT_RESPONSE=$(curl -s -X POST $API_URL/payments \
  -H "Authorization: Bearer $CLIENT_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"order\": \"$ORDER_ID\",
    \"client\": \"$CLIENT_ID\",
    \"amount\": 20000,
    \"provider\": \"ORANGE\",
    \"phoneNumber\": \"$TEST_CLIENT_PHONE\",
    \"status\": \"PENDING\",
    \"transactionId\": \"$TRANSACTION_ID\"
  }")
echo "$PAYMENT_RESPONSE"
PAYMENT_ID=$(extract_json "$PAYMENT_RESPONSE" "_id")
echo -e "${GREEN}✓ Payment record created with ID: $PAYMENT_ID${NC}"
echo ""

echo "6.3 Confirm payment (mock)..."
curl -s -X POST $MOCK_URL/api/mobile-money/confirm/$TRANSACTION_ID \
  -H "Content-Type: application/json"
echo ""
echo -e "${GREEN}✓ Payment confirmed via mock service${NC}"
echo ""

echo "6.4 Update payment status in database..."
curl -s -X PATCH $API_URL/payments/$PAYMENT_ID/status \
  -H "Authorization: Bearer $CLIENT_TOKEN" \
  -H "Content-Type: application/json" \
  -d "{
    \"status\": \"SUCCESS\",
    \"transactionId\": \"$TRANSACTION_ID\"
  }"
echo ""
echo -e "${GREEN}✓ Payment status updated to SUCCESS${NC}"
echo ""

echo "6.5 Send SMS notification (mock)..."
curl -s -X POST $MOCK_URL/api/sms/send \
  -H "Content-Type: application/json" \
  -d "{
    \"phoneNumber\": \"$TEST_CLIENT_PHONE\",
    \"message\": \"Votre paiement de 20000 FCFA a été confirmé pour la commande $ORDER_ID\"
  }"
echo ""
echo -e "${GREEN}✓ SMS notification sent${NC}"
echo ""

# Final Summary
echo -e "${BLUE}=== SUMMARY ===${NC}"
echo "Test Run: $TIMESTAMP"
echo "Client Email: $TEST_CLIENT_EMAIL"
echo "Client ID: $CLIENT_ID"
echo "Technician Email: $TEST_TECH_EMAIL"
echo "Technician ID: $TECH_ID"
echo "Order ID: $ORDER_ID"
echo "Payment ID: $PAYMENT_ID"
echo "Transaction ID: $TRANSACTION_ID"
echo ""
echo -e "${GREEN}✓ All test scenarios completed successfully!${NC}"
