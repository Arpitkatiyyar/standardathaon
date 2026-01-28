import { motion } from 'framer-motion'
import patron1 from '../assets/person.png'

interface Member {
  name: string
  role: string
  image: string
}

const patrons: Member[] = [
  {
    name: 'Dr. ABC XYZ',
    role: 'Director, NIT Hamirpur',
    image: patron1,
  },
  {
    name: 'Mr. DEF PQR',
    role: 'Senior Official, BIS',
    image: patron1,
  },
]

const organisers: Member[] = [
  {
    name: 'Prof. John Doe',
    role: 'Faculty Coordinator',
    image: patron1,
  },
  {
    name: 'Dr. Jane Smith',
    role: 'Event Lead',
    image: patron1,
  },
  {
    name: 'Mr. Rahul Verma',
    role: 'Student Coordinator',
    image: patron1,
  },
]

function Section({
  title,
  members,
}: {
  title: string
  members: Member[]
}) {
  return (
    <section className="mb-24">
      {/* Section Heading */}
      <div className="text-center mb-14">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {title}
        </h2>
        <div className="mx-auto w-28 h-[3px] bg-gradient-to-r from-[#34a1eb] to-[#9c371e] rounded-full" />
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {members.map((member, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.05 }}
            className="group relative bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
          >
            {/* Image */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
            </div>

            {/* Content */}
            <div className="p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-900">
                {member.name}
              </h3>
              <p className="mt-2 text-sm font-medium text-[#9c371e]">
                {member.role}
              </p>
            </div>

            {/* Hover Accent */}
            <div className="absolute inset-x-0 bottom-0 h-[4px] bg-gradient-to-r from-[#34a1eb] to-[#9c371e] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
          </motion.div>
        ))}
      </div>
    </section>
  )
}

export default function Members() {
  return (
    <section className="py-24 bg-gradient-to-b from-[#f4f9ff] via-[#fafbfd] to-[#fff4ee]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Page Heading */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Team
          </h1>
          <div className="mx-auto w-32 h-[3px] bg-gradient-to-r from-[#34a1eb] to-[#9c371e] rounded-full" />
          <p className="mt-6 text-xl text-gray-600">
            The people behind BIS × NIT Hamirpur Hackathon
          </p>
        </div>

        {/* Sections */}
        <Section title="Patrons" members={patrons} />
        <Section title="Organising Committee" members={organisers} />
      </div>
    </section>
  )
}
