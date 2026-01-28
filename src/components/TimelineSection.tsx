import { Calendar, CheckCircle2, Flag, Trophy, Users } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

export default function TimelineSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null)

  const timelineEvents = [
    { icon: Calendar, title: 'Registration Opens', date: 'March 1, 2024', description: 'Start your journey by registering for the hackathon', accent: '#34a1eb' },
    { icon: CheckCircle2, title: 'Problem Statements Release', date: 'March 10, 2024', description: 'Choose from diverse problem statements across various domains', accent: '#9c371e' },
    { icon: Users, title: 'Team Formation Deadline', date: 'March 15, 2024', description: 'Form or join teams with up to 4 members', accent: '#34a1eb' },
    { icon: Flag, title: 'Hackathon Begins', date: 'March 20, 2024', description: '48 hours of non-stop innovation and coding', accent: '#9c371e' },
    { icon: CheckCircle2, title: 'Submission Deadline', date: 'March 22, 2024', description: 'Submit your solutions and presentations', accent: '#34a1eb' },
    { icon: Trophy, title: 'Results & Closing Ceremony', date: 'March 25, 2024', description: 'Winner announcements and prize distribution', accent: '#9c371e' },
  ]

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 25%', 'end 75%'],
  })

  const lineFill = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section
      ref={sectionRef}
      className="relative py-24 bg-gradient-to-b from-[#f9fbfd] via-[#ffffff] to-[#f9fbfd] overflow-hidden"
    >
      {/* subtle background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#00000008,_transparent_60%),radial-gradient(circle_at_bottom,_#00000008,_transparent_60%)]" />

      <div className="relative max-w-6xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Hackathon Timeline
          </h2>
          <div className="mx-auto w-32 h-[3px] bg-gradient-to-r from-[#34a1eb] to-[#9c371e] rounded-full" />
          <p className="mt-6 text-xl text-gray-600">
            Mark your calendars for these important dates
          </p>
        </div>

        <div className="relative">
          {/* Base timeline */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-[3px] h-full bg-gray-200" />

          {/* Animated fill */}
          <motion.div
            style={{ height: lineFill }}
            className="hidden md:block absolute left-1/2 -translate-x-1/2 w-[3px]
              bg-gradient-to-b from-[#34a1eb] via-[#9c371e] to-[#34a1eb]
              origin-top"
          />

          <div className="space-y-20">
            {timelineEvents.map((event, index) => {
              const Icon = event.icon
              const isEven = index % 2 === 0

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className={`relative flex items-center ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-col`}
                >
                  {/* Card */}
                  <div className={`w-full md:w-5/12 ${isEven ? 'md:pr-4 md:text-right' : 'md:pl-4 md:text-left'}`}>
                    <motion.div
                      initial={{ opacity: 0.9 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}
                      className="relative rounded-2xl p-7 shadow-lg border border-gray-200
                        bg-gradient-to-br from-gray-50 via-white to-gray-100"
                    >
                      <div className="relative">
                        <div className="flex items-center gap-4 mb-4">
                          <div
                            className="w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-md"
                            style={{ background: event.accent }}
                          >
                            <Icon size={20} />
                          </div>
                          <h3 className="text-2xl font-semibold text-gray-900">
                            {event.title}
                          </h3>
                        </div>

                        <p className="text-sm font-semibold mb-2" style={{ color: event.accent }}>
                          {event.date}
                        </p>

                        <p className="text-gray-600 leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                    </motion.div>
                  </div>

                  {/* Timeline node */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                      viewport={{ once: true }}
                      className="w-4 h-4 rounded-full bg-white border-4 shadow"
                      style={{ borderColor: event.accent }}
                    />
                  </div>

                  <div className="w-full md:w-5/12" />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
