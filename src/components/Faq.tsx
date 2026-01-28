import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: 'Who can participate in the hackathon?',
    answer:
      'Students from any department and any year are eligible to participate. The hackathon is open to undergraduate and postgraduate students.',
  },
  {
    question: 'What is the team size?',
    answer:
      'Each team must consist of 2 to 4 members. At least two members should belong to core engineering branches such as Mechanical, Civil, or Chemical Engineering.',
  },
  {
    question: 'Is prior knowledge of BIS required?',
    answer:
      'No prior knowledge of BIS is required. Problem statements are designed to help students understand and apply standards during the hackathon.',
  },
  {
    question: 'Is this an online or offline hackathon?',
    answer:
      'The hackathon will be conducted in hybrid mode. Final details regarding venue and online participation will be communicated to registered teams.',
  },
  {
    question: 'Is there any registration fee?',
    answer:
      'No, participation in the BIS × NIT Hamirpur Hackathon is completely free of cost.',
  },
  {
    question: 'What will participants receive?',
    answer:
      'Participants will receive certificates, mentorship, and winners will be awarded prizes and recognition by BIS and NIT Hamirpur.',
  },
]

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <section className="py-24 bg-gradient-to-b from-[#f4f9ff] via-[#fafbfd] to-[#fff4ee]">
      <div className="max-w-5xl mx-auto px-4">
        {/* HEADER */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <div className="mx-auto w-32 h-[3px] bg-gradient-to-r from-[#34a1eb] to-[#9c371e] rounded-full" />
          <p className="mt-6 text-xl text-gray-600">
            Everything you need to know about the hackathon
          </p>
        </div>

        {/* FAQ LIST */}
        <div className="space-y-6">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
              >
                {/* QUESTION */}
                <button
                  onClick={() =>
                    setActiveIndex(isOpen ? null : index)
                  }
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <h3 className="text-lg font-semibold text-gray-900">
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-[#34a1eb]"
                  >
                    <ChevronDown />
                  </motion.div>
                </button>

                {/* ANSWER */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="px-6 pb-6 text-gray-600 leading-relaxed"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
