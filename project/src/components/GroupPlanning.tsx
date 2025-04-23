import React, { useState } from 'react';
import { Users, Plus, X } from 'lucide-react';

interface GroupMember {
  name: string;
  email: string;
}

interface GroupPlanningProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
}

const GroupPlanning: React.FC<GroupPlanningProps> = ({ formData, updateFormData }) => {
  const [newMember, setNewMember] = useState<GroupMember>({ name: '', email: '' });

  const addMember = () => {
    if (newMember.name && newMember.email) {
      const currentMembers = formData.groupMembers || [];
      updateFormData('groupMembers', [...currentMembers, newMember]);
      updateFormData('groupSize', (currentMembers.length + 2)); // +2 for new member and organizer
      setNewMember({ name: '', email: '' });
    }
  };

  const removeMember = (index: number) => {
    const currentMembers = formData.groupMembers || [];
    updateFormData('groupMembers', currentMembers.filter((_: any, i: number) => i !== index));
    updateFormData('groupSize', currentMembers.length); // Update group size
  };

  return (
    <div className="mt-8 p-6 bg-white rounded-xl shadow-sm">
      <div className="flex items-center mb-4">
        <Users className="text-[#CBA95D] w-6 h-6" />
        <h3 className="text-xl font-semibold ml-2">Group Planning</h3>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Member Name</label>
            <input
              type="text"
              value={newMember.name}
              onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#CBA95D] focus:outline-none focus:ring-1 focus:ring-[#CBA95D]"
              placeholder="Enter member name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Member Email</label>
            <input
              type="email"
              value={newMember.email}
              onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#CBA95D] focus:outline-none focus:ring-1 focus:ring-[#CBA95D]"
              placeholder="Enter member email"
            />
          </div>
        </div>

        <button
          onClick={addMember}
          className="flex items-center px-4 py-2 bg-[#2C5F3E] text-white rounded-lg hover:bg-[#1F4F2E] transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Member
        </button>

        {/* Group Members List */}
        <div className="mt-6">
          <h4 className="text-lg font-medium text-[#2C5F3E] mb-3">Group Members</h4>
          <div className="space-y-2">
            {/* Organizer */}
            <div className="flex items-center justify-between p-3 bg-[#F1F1F1] rounded-lg">
              <div>
                <p className="font-medium">You (Organizer)</p>
                <p className="text-sm text-gray-600">Your email</p>
              </div>
            </div>

            {/* Added Members */}
            {(formData.groupMembers || []).map((member: GroupMember, index: number) => (
              <div key={index} className="flex items-center justify-between p-3 bg-[#F1F1F1] rounded-lg">
                <div>
                  <p className="font-medium">{member.name}</p>
                  <p className="text-sm text-gray-600">{member.email}</p>
                </div>
                <button
                  onClick={() => removeMember(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-[#DDC6A4] bg-opacity-20 rounded-lg">
        <p className="text-sm text-[#00573F]">
          <strong>Note:</strong> Added members will receive an email invitation to join and view the trip details.
        </p>
      </div>
    </div>
  );
};

export default GroupPlanning;