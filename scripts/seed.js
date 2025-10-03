const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/prochezmoi';

const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  phone: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['CLIENT', 'TECHNICIAN', 'ADMIN'], default: 'CLIENT' },
  address: {
    street: String,
    city: String,
    postalCode: String,
    coordinates: { lat: Number, lng: Number }
  },
  technicianProfile: {
    status: { type: String, enum: ['PENDING', 'VALIDATED', 'REJECTED'] },
    categories: [String],
    experience: Number,
    rating: Number,
    totalJobs: Number,
    documents: [String],
    availability: Boolean
  },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const OrderSchema = new mongoose.Schema({
  appReference: { type: String, unique: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  technician: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  category: String,
  description: String,
  status: { type: String, enum: ['PENDING', 'ASSIGNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'], default: 'PENDING' },
  address: {
    street: String,
    city: String,
    postalCode: String,
    coordinates: { lat: Number, lng: Number }
  },
  scheduledDate: Date,
  completedDate: Date,
  checkIn: {
    timestamp: Date,
    coordinates: { lat: Number, lng: Number }
  },
  checkOut: {
    timestamp: Date,
    coordinates: { lat: Number, lng: Number }
  },
  estimatedPrice: Number,
  finalPrice: Number,
  isPaid: { type: Boolean, default: false }
}, { timestamps: true });

const ScheduleSchema = new mongoose.Schema({
  technician: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: Date,
  timeSlot: String,
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  isAvailable: { type: Boolean, default: true },
  category: String
}, { timestamps: true });

const PaymentSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: Number,
  provider: { type: String, enum: ['ORANGE', 'MTN'] },
  phoneNumber: String,
  status: { type: String, enum: ['PENDING', 'SUCCESS', 'FAILED'], default: 'PENDING' },
  transactionId: String,
  externalReference: String
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);
const Order = mongoose.model('Order', OrderSchema);
const Schedule = mongoose.model('Schedule', ScheduleSchema);
const Payment = mongoose.model('Payment', PaymentSchema);

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    await User.deleteMany({});
    await Order.deleteMany({});
    await Schedule.deleteMany({});
    await Payment.deleteMany({});
    console.log('Cleared existing data');

    const hashedPassword = await bcrypt.hash('password123', 10);

    const admin = await User.create({
      firstName: 'Admin',
      lastName: 'System',
      email: 'admin@prochezmoi.cm',
      phone: '+237600000000',
      password: hashedPassword,
      role: 'ADMIN'
    });
    console.log('Created admin user');

    const clients = await User.insertMany([
      {
        firstName: 'Jean',
        lastName: 'Dupont',
        email: 'jean.dupont@email.cm',
        phone: '+237650111111',
        password: hashedPassword,
        role: 'CLIENT',
        address: {
          street: '123 Rue de la Paix',
          city: 'Douala',
          postalCode: '00237',
          coordinates: { lat: 4.0511, lng: 9.7679 }
        }
      },
      {
        firstName: 'Marie',
        lastName: 'Ngono',
        email: 'marie.ngono@email.cm',
        phone: '+237650222222',
        password: hashedPassword,
        role: 'CLIENT',
        address: {
          street: '456 Avenue des Cocotiers',
          city: 'Yaoundé',
          postalCode: '00237',
          coordinates: { lat: 3.8480, lng: 11.5021 }
        }
      },
      {
        firstName: 'Paul',
        lastName: 'Kamga',
        email: 'paul.kamga@email.cm',
        phone: '+237650333333',
        password: hashedPassword,
        role: 'CLIENT',
        address: {
          street: '789 Boulevard du 20 Mai',
          city: 'Douala',
          postalCode: '00237',
          coordinates: { lat: 4.0435, lng: 9.7009 }
        }
      }
    ]);
    console.log('Created client users');

    const technicians = await User.insertMany([
      {
        firstName: 'Thomas',
        lastName: 'Electricien',
        email: 'thomas.elec@email.cm',
        phone: '+237655111111',
        password: hashedPassword,
        role: 'TECHNICIAN',
        address: {
          street: '10 Rue Industrielle',
          city: 'Douala',
          postalCode: '00237',
          coordinates: { lat: 4.0483, lng: 9.7043 }
        },
        technicianProfile: {
          status: 'VALIDATED',
          categories: ['ELECTRICITY', 'HVAC'],
          experience: 5,
          rating: 4.5,
          totalJobs: 150,
          availability: true
        }
      },
      {
        firstName: 'Sophie',
        lastName: 'Plombier',
        email: 'sophie.plomb@email.cm',
        phone: '+237655222222',
        password: hashedPassword,
        role: 'TECHNICIAN',
        address: {
          street: '25 Avenue du Commerce',
          city: 'Yaoundé',
          postalCode: '00237',
          coordinates: { lat: 3.8667, lng: 11.5167 }
        },
        technicianProfile: {
          status: 'VALIDATED',
          categories: ['PLUMBING'],
          experience: 3,
          rating: 4.8,
          totalJobs: 80,
          availability: true
        }
      },
      {
        firstName: 'Michel',
        lastName: 'Menuisier',
        email: 'michel.menu@email.cm',
        phone: '+237655333333',
        password: hashedPassword,
        role: 'TECHNICIAN',
        address: {
          street: '30 Quartier Akwa',
          city: 'Douala',
          postalCode: '00237',
          coordinates: { lat: 4.0534, lng: 9.7140 }
        },
        technicianProfile: {
          status: 'VALIDATED',
          categories: ['CARPENTRY', 'PAINTING'],
          experience: 7,
          rating: 4.7,
          totalJobs: 200,
          availability: true
        }
      },
      {
        firstName: 'Alice',
        lastName: 'Nettoyage',
        email: 'alice.clean@email.cm',
        phone: '+237655444444',
        password: hashedPassword,
        role: 'TECHNICIAN',
        address: {
          street: '15 Rue Joffre',
          city: 'Douala',
          postalCode: '00237',
          coordinates: { lat: 4.0583, lng: 9.7061 }
        },
        technicianProfile: {
          status: 'PENDING',
          categories: ['CLEANING'],
          experience: 1,
          rating: 0,
          totalJobs: 0,
          availability: false
        }
      }
    ]);
    console.log('Created technician users');

    const orders = await Order.insertMany([
      {
        appReference: 'ORD-2025-001-ABC123',
        client: clients[0]._id,
        technician: technicians[0]._id,
        category: 'ELECTRICITY',
        description: 'Installation de prises électriques dans le salon et la cuisine',
        status: 'COMPLETED',
        address: clients[0].address,
        scheduledDate: new Date('2025-09-28'),
        completedDate: new Date('2025-09-28'),
        checkIn: {
          timestamp: new Date('2025-09-28T08:00:00Z'),
          coordinates: { lat: 4.0511, lng: 9.7679 }
        },
        checkOut: {
          timestamp: new Date('2025-09-28T12:30:00Z'),
          coordinates: { lat: 4.0511, lng: 9.7679 }
        },
        estimatedPrice: 25000,
        finalPrice: 25000,
        isPaid: true
      },
      {
        appReference: 'ORD-2025-002-DEF456',
        client: clients[1]._id,
        technician: technicians[1]._id,
        category: 'PLUMBING',
        description: 'Réparation de fuite d\'eau dans la salle de bain',
        status: 'IN_PROGRESS',
        address: clients[1].address,
        scheduledDate: new Date('2025-10-03'),
        checkIn: {
          timestamp: new Date('2025-10-03T09:00:00Z'),
          coordinates: { lat: 3.8480, lng: 11.5021 }
        },
        estimatedPrice: 15000,
        isPaid: false
      },
      {
        appReference: 'ORD-2025-003-GHI789',
        client: clients[2]._id,
        technician: technicians[2]._id,
        category: 'CARPENTRY',
        description: 'Fabrication et installation d\'une armoire sur mesure',
        status: 'ASSIGNED',
        address: clients[2].address,
        scheduledDate: new Date('2025-10-05'),
        estimatedPrice: 75000,
        isPaid: false
      },
      {
        appReference: 'ORD-2025-004-JKL012',
        client: clients[0]._id,
        category: 'PAINTING',
        description: 'Peinture des murs de deux chambres',
        status: 'PENDING',
        address: clients[0].address,
        estimatedPrice: 40000,
        isPaid: false
      }
    ]);
    console.log('Created orders');

    const schedules = await Schedule.insertMany([
      {
        technician: technicians[0]._id,
        date: new Date('2025-10-04'),
        timeSlot: '08:00-12:00',
        isAvailable: true,
        category: 'ELECTRICITY'
      },
      {
        technician: technicians[0]._id,
        date: new Date('2025-10-04'),
        timeSlot: '14:00-18:00',
        isAvailable: true,
        category: 'ELECTRICITY'
      },
      {
        technician: technicians[1]._id,
        date: new Date('2025-10-03'),
        timeSlot: '09:00-13:00',
        order: orders[1]._id,
        isAvailable: false,
        category: 'PLUMBING'
      },
      {
        technician: technicians[1]._id,
        date: new Date('2025-10-04'),
        timeSlot: '08:00-12:00',
        isAvailable: true,
        category: 'PLUMBING'
      },
      {
        technician: technicians[2]._id,
        date: new Date('2025-10-05'),
        timeSlot: '08:00-18:00',
        order: orders[2]._id,
        isAvailable: false,
        category: 'CARPENTRY'
      },
      {
        technician: technicians[2]._id,
        date: new Date('2025-10-06'),
        timeSlot: '08:00-12:00',
        isAvailable: true,
        category: 'CARPENTRY'
      }
    ]);
    console.log('Created schedules');

    const payments = await Payment.insertMany([
      {
        order: orders[0]._id,
        client: clients[0]._id,
        amount: 25000,
        provider: 'ORANGE',
        phoneNumber: '+237650111111',
        status: 'SUCCESS',
        transactionId: 'OM-1727523600-ABC123XYZ',
        externalReference: 'PAY-2025-001'
      },
      {
        order: orders[1]._id,
        client: clients[1]._id,
        amount: 15000,
        provider: 'MTN',
        phoneNumber: '+237650222222',
        status: 'PENDING',
        transactionId: 'MTN-1727956800-DEF456XYZ',
        externalReference: 'PAY-2025-002'
      }
    ]);
    console.log('Created payments');

    console.log('\n=== SEED DATA SUMMARY ===');
    console.log(`Admin: ${admin.email} / password123`);
    console.log(`\nClients: ${clients.length}`);
    clients.forEach(c => console.log(`  - ${c.firstName} ${c.lastName} (${c.email})`));
    console.log(`\nTechnicians: ${technicians.length}`);
    technicians.forEach(t => console.log(`  - ${t.firstName} ${t.lastName} (${t.email}) - ${t.technicianProfile.status}`));
    console.log(`\nOrders: ${orders.length}`);
    orders.forEach(o => console.log(`  - ${o.appReference} (${o.status})`));
    console.log(`\nSchedules: ${schedules.length}`);
    console.log(`Payments: ${payments.length}`);
    console.log('\nSeed completed successfully!');

    await mongoose.connection.close();
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}

seed();
