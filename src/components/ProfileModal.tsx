import React, { useState } from 'react';
import { X, User, GraduationCap, MapPin, Check } from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onSaveProfile: (profile: UserProfile) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  onSaveProfile,
}) => {
  const [name, setName] = useState(user.name);
  const [university, setUniversity] = useState(user.university);
  const [major, setMajor] = useState(user.major);
  const [studentId, setStudentId] = useState(user.studentId);
  const [dormitory, setDormitory] = useState(user.dormitory);
  const [roomNumber, setRoomNumber] = useState(user.roomNumber);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile({
      ...user,
      name: name.trim(),
      university: university.trim(),
      major: major.trim(),
      studentId: studentId.trim(),
      dormitory: dormitory.trim(),
      roomNumber: roomNumber.trim(),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-3 sm:p-4">
      <div className="glass-panel bg-[#0B1020]/95 backdrop-blur-2xl rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-white/[0.12] shadow-2xl p-4 sm:p-6 space-y-4 text-right">
        
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#663AF3]/20 border border-[#663AF3]/35 text-[#65D5FF]">
              <User className="w-4 h-4" />
            </span>
            <h2 className="font-black text-sm text-[#F1F3FA]">
              تنظیم مشخصات و اطلاعات دانشجو
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#707B96] hover:text-[#F1F3FA] hover:bg-white/[0.06] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block font-bold text-[#A6AEC3] mb-1.5">
              نام و نام خانوادگی:
            </label>
            <input
              type="text"
              required
              placeholder="مثلاً: علی محمدی"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-[#11182A]/90 border border-white/[0.08] text-[#F1F3FA] placeholder-[#707B96] outline-none focus:border-[#663AF3] focus:ring-1 focus:ring-[#663AF3] transition-all"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-[#A6AEC3] mb-1.5">
                دانشگاه:
              </label>
              <input
                type="text"
                placeholder="مثلاً: دانشگاه تهران"
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#11182A]/90 border border-white/[0.08] text-[#F1F3FA] placeholder-[#707B96] outline-none focus:border-[#663AF3]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#A6AEC3] mb-1.5">
                رشته تحصیلی:
              </label>
              <input
                type="text"
                placeholder="مثلاً: مهندسی صنایع"
                value={major}
                onChange={(e) => setMajor(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#11182A]/90 border border-white/[0.08] text-[#F1F3FA] placeholder-[#707B96] outline-none focus:border-[#663AF3]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-[#A6AEC3] mb-1.5">
                شماره دانشجویی (اختیاری):
              </label>
              <input
                type="text"
                placeholder="۴۰۱..."
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#11182A]/90 border border-white/[0.08] text-[#F1F3FA] placeholder-[#707B96] outline-none focus:border-[#663AF3]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#A6AEC3] mb-1.5">
                شماره اتاق / بلوک:
              </label>
              <input
                type="text"
                placeholder="اتاق ۲۰۳"
                value={roomNumber}
                onChange={(e) => setRoomNumber(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-[#11182A]/90 border border-white/[0.08] text-[#F1F3FA] placeholder-[#707B96] outline-none focus:border-[#663AF3]"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-[#A6AEC3] mb-1.5">
              نام خوابگاه (در صورت سکونت در خوابگاه):
            </label>
            <input
              type="text"
              placeholder="مثلاً: خوابگاه کوی دانشگاه / خوابگاه شهید چمران"
              value={dormitory}
              onChange={(e) => setDormitory(e.target.value)}
              className="w-full p-2.5 rounded-xl bg-[#11182A]/90 border border-white/[0.08] text-[#F1F3FA] placeholder-[#707B96] outline-none focus:border-[#663AF3]"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/[0.08]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[#A6AEC3] hover:text-[#F1F3FA] hover:bg-white/[0.06] transition-colors cursor-pointer"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="btn-primary-futuristic text-xs px-5 py-2.5 font-bold cursor-pointer"
            >
              ذخیره اطلاعات
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
