import { useState } from 'react';
import toast from 'react-hot-toast';
import { Calendar as CalendarIcon, ListTodo, AlertTriangle } from 'lucide-react';
import AttendanceCalendar from '../components/AttendanceCalendar';

const mockStudents = [
  { id: 1, name: 'Aarav Sharma', batch: 'Morning (U-15)' },
  { id: 2, name: 'Priya Patel', batch: 'Evening (U-13)' },
  { id: 3, name: 'Rohan Gupta', batch: 'Morning (U-17)' },
  { id: 4, name: 'Kavita Singh', batch: 'Weekend (U-11)' }
];

const Attendance = () => {
  const [view, setView] = useState('today'); // 'today' or 'calendar'
  const [attendance, setAttendance] = useState({});

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const handleMark = (id, status) => {
    setAttendance(prev => ({ ...prev, [id]: status }));
  };

  const handleSave = () => {
    toast.success('Attendance saved for today!');
  };

  return (
    <div className="pb-24">
      {/* View Toggle */}
      <div className="flex bg-gray-100 p-1 rounded-xl mb-4 max-w-sm mx-auto">
        <button
          onClick={() => setView('today')}
          className={`flex-1 py-2 text-sm font-semibold rounded-lg flex justify-center items-center gap-2 transition-all ${
            view === 'today' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'
          }`}
        >
          <ListTodo size={18} /> Today
        </button>
        <button
          id="calendar-toggle-btn"
          onClick={() => setView('calendar')}
          className={`flex-1 py-2 text-sm font-semibold rounded-lg flex justify-center items-center gap-2 transition-all ${
            view === 'calendar' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'
          }`}
        >
          <CalendarIcon size={18} /> Calendar
        </button>
      </div>

      {view === 'calendar' ? (
        <AttendanceCalendar />
      ) : (
        <>
          <div className="mb-4 bg-blue-50 text-blue-800 p-3 rounded-xl text-center font-semibold shadow-sm border border-blue-100">
            {today}
          </div>

          <div className="space-y-3 mb-6">
            {mockStudents.map((student) => {
              const status = attendance[student.id];
              return (
                <div key={student.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-800">{student.name}</h3>
                    <div className="text-xs text-gray-500 mt-0.5">{student.batch}</div>
                  </div>
                  
                  <div className="flex bg-gray-100 p-1 rounded-lg">
                    <button
                      onClick={() => handleMark(student.id, 'present')}
                      className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                        status === 'present' 
                          ? 'bg-green-500 text-white shadow-sm' 
                          : 'text-gray-500 hover:text-green-600 hover:bg-white relative z-10'
                      }`}
                    >
                      P
                    </button>
                    <button
                      onClick={() => handleMark(student.id, 'absent')}
                      className={`px-4 py-1.5 text-sm font-medium rounded-md transition-all ${
                        status === 'absent' 
                          ? 'bg-red-500 text-white shadow-sm' 
                          : 'text-gray-500 hover:text-red-600 hover:bg-white relative z-10'
                      }`}
                    >
                      A
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="fixed bottom-20 left-4 right-4 max-w-3xl mx-auto z-10 transition-transform">
            <button 
              onClick={handleSave}
              className="w-full bg-blue-600 text-white font-semibold py-4 rounded-2xl shadow-lg shadow-blue-200 active:scale-[0.98] transition-transform"
            >
              Save Attendance
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Attendance;
