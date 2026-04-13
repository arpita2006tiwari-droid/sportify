import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import CalendarDayModal from './CalendarDayModal';

const mockHistoricalData = {
  '2026-04-05': { majority: 'absent' },
  '2026-04-06': { majority: 'present' },
  '2026-04-07': { majority: 'present' },
  '2026-04-08': { majority: 'present' },
};

const AttendanceCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentViewDate, setCurrentViewDate] = useState(new Date(2026, 3, 1)); // Defaulting to April 2026 for demo data

  const viewYear = currentViewDate.getFullYear();
  const viewMonth = currentViewDate.getMonth();

  const today = new Date();
  const todayKey = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handleDayClick = (dayStr, summary) => {
    setSelectedDate({ date: dayStr, summary });
  };

  const handlePrevMonth = () => {
    setCurrentViewDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentViewDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handleGoToToday = () => {
    setCurrentViewDate(new Date());
  };

  const renderCells = () => {
    let cells = [];
    
    // Empty blocks for start day offset
    for (let i = 0; i < firstDayOfMonth; i++) {
      cells.push(<div key={`empty-${i}`} className="p-2 opacity-0"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${viewYear}-${(viewMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
      const info = mockHistoricalData[dateKey];
      
      const checkDate = new Date(viewYear, viewMonth, day);
      const isToday = checkDate.toDateString() === today.toDateString();
      const isFuture = checkDate > today;

      let bgColor = 'bg-gray-50 border-gray-100 hover:bg-gray-100';
      let textColor = 'text-gray-700';

      if (info) {
        if (info.majority === 'present') {
          bgColor = 'bg-green-50 border-green-200 hover:bg-green-100 text-green-700';
        } else if (info.majority === 'absent') {
          bgColor = 'bg-red-50 border-red-200 hover:bg-red-100 text-red-700';
        }
      }

      if (isToday) {
        bgColor = 'bg-blue-600 text-white shadow-md border-blue-600';
        textColor = 'text-white';
      }

      const displayClasses = isFuture 
        ? 'bg-gray-50/30 border-gray-50/50 opacity-40 cursor-default' 
        : `${bgColor} ${textColor} cursor-pointer`;

      cells.push(
        <div
          key={day}
          onClick={() => !isFuture && handleDayClick(dateKey, info)}
          className={`aspect-square rounded-xl flex flex-col items-center justify-center font-semibold border transition-all duration-200 text-sm sm:text-base ${displayClasses}`}
        >
          {day}
        </div>
      );
    }

    return cells;
  };

  return (
    <div className="bg-white p-4 sm:p-6 rounded-3xl shadow-sm border border-gray-100 mt-4 mb-24 max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          {monthNames[viewMonth]} <span className="text-gray-400 font-medium">{viewYear}</span>
        </h2>
        
        <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
          <button 
            id="prev-month-btn"
            onClick={handlePrevMonth}
            className="p-2 hover:bg-white hover:shadow-sm rounded-xl transition-all text-gray-600"
          >
            <ChevronLeft size={20} />
          </button>
          
          <button 
            id="today-btn"
            onClick={handleGoToToday}
            className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 hover:bg-white hover:shadow-sm rounded-xl transition-all"
          >
            Today
          </button>
          
          <button 
            id="next-month-btn"
            onClick={handleNextMonth}
            className="p-2 hover:bg-white hover:shadow-sm rounded-xl transition-all text-gray-600"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-3 text-center text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest">
        <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
      </div>
      
      <div className="grid grid-cols-7 gap-1.5 sm:gap-2.5">
        {renderCells()}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-around text-xs font-medium text-gray-500">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span>Active Session</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span>No Session</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-600"></div>
          <span>Current Day</span>
        </div>
      </div>

      <CalendarDayModal
        isOpen={!!selectedDate}
        onClose={() => setSelectedDate(null)}
        date={selectedDate?.date}
        summary={selectedDate?.summary}
      />
    </div>
  );
};

export default AttendanceCalendar;

