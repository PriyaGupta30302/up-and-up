'use client'
import React from 'react'

function Team() {
  const teamMembers = [
    { name: 'Alice Johnson', role: 'Creative Director', photo: '/assets/team/alice.jpg' },
    { name: 'Michael Smith', role: 'Lead Developer', photo: '/assets/team/michael.jpg' },
    { name: 'Sara Lee', role: 'Marketing Manager', photo: '/assets/team/sara.jpg' },
    { name: 'John Doe', role: 'Project Manager', photo: '/assets/team/john.jpg' }
  ]

  return (
    <section className="w-full py-20 px-8 max-w-7xl mx-auto text-white">
      <h2 className="text-4xl font-semibold mb-12 text-center">Meet Our Team</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {teamMembers.map((member) => (
          <div key={member.name} className="flex flex-col items-center">
            <img
              src={member.photo}
              alt={member.name}
              className="w-40 h-40 rounded-full object-cover mb-6 border-4 border-white"
            />
            <h3 className="text-xl font-medium">{member.name}</h3>
            <p className="text-sm opacity-80">{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Team
