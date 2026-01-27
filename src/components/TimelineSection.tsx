import { Calendar, CheckCircle2, Flag, Trophy, Users } from 'lucide-react';

export default function TimelineSection() {
  const timelineEvents = [
    {
      icon: Calendar,
      title: 'Registration Opens',
      date: 'March 1, 2024',
      description: 'Start your journey by registering for the hackathon',
      color: 'bg-[#34a1eb]',
    },
    {
      icon: CheckCircle2,
      title: 'Problem Statements Release',
      date: 'March 10, 2024',
      description: 'Choose from diverse problem statements across various domains',
      color: 'bg-[#9c371e]',
    },
    {
      icon: Users,
      title: 'Team Formation Deadline',
      date: 'March 15, 2024',
      description: 'Form or join teams with up to 4 members',
      color: 'bg-[#34a1eb]',
    },
    {
      icon: Flag,
      title: 'Hackathon Begins',
      date: 'March 20, 2024',
      description: '48 hours of non-stop innovation and coding',
      color: 'bg-[#9c371e]',
    },
    {
      icon: CheckCircle2,
      title: 'Submission Deadline',
      date: 'March 22, 2024',
      description: 'Submit your solutions and presentations',
      color: 'bg-[#34a1eb]',
    },
    {
      icon: Trophy,
      title: 'Results & Closing Ceremony',
      date: 'March 25, 2024',
      description: 'Winner announcements and prize distribution',
      color: 'bg-[#9c371e]',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Hackathon Timeline
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#34a1eb] to-[#9c371e] mx-auto mb-6" />
            <p className="text-xl text-gray-600">
              Mark your calendars for these important dates
            </p>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#34a1eb] to-[#9c371e]" />

            <div className="space-y-12">
              {timelineEvents.map((event, index) => {
                const Icon = event.icon;
                const isEven = index % 2 === 0;

                return (
                  <div
                    key={index}
                    className={`relative flex items-center ${
                      isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                    } flex-col`}
                  >
                    <div
                      className={`w-full md:w-5/12 ${
                        isEven ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'
                      }`}
                    >
                      <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border-l-4 border-l-transparent hover:border-l-[#34a1eb]">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className={`${event.color} w-10 h-10 rounded-lg flex items-center justify-center text-white`}>
                            <Icon size={20} />
                          </div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {event.title}
                          </h3>
                        </div>
                        <p className="text-[#34a1eb] font-semibold mb-2">{event.date}</p>
                        <p className="text-gray-600">{event.description}</p>
                      </div>
                    </div>

                    <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-4 border-[#34a1eb] rounded-full z-10" />

                    <div className="w-full md:w-5/12" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
