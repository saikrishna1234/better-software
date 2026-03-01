import { useState, useEffect } from 'react';
import { Plus, Trash2, Database, ShieldCheck, Activity, Terminal } from 'lucide-react';

const API_URL = 'http://127.0.0.1:5001/api/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error('API Unreachable');
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask), 
      });

      if (response.ok) {
        setNewTask({ title: '', description: '' });
        fetchTasks(); 
      }
    } catch (err) {
      console.error("Add error:", err);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (response.ok) fetchTasks();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans antialiased">
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-xl tracking-tight">
            <ShieldCheck size={28} strokeWidth={2.5} />
            <span>Task<span className="text-slate-900 font-black">Engine</span></span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 border border-slate-200 px-4 py-2 rounded-full">
            <span className="flex items-center gap-2 italic"><Database size={12} className="text-indigo-500"/> DB: PostgreSQL 16</span>
            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
            <span className="flex items-center gap-2 italic"><Terminal size={12} className="text-indigo-500"/> API: Flask/Python</span>
          </div>
        </div>
      </nav>

      {/* 2. Content Layout */}
      <main className="max-w-6xl mx-auto p-6 md:p-10">
        
        <div className="mb-12 text-center md:text-left">
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-2">
            System Infrastructure <span className="text-indigo-600">Overview</span>
          </h2>
          <p className="text-slate-500 font-medium">Monitoring real-time task distribution across the full-stack architecture.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          <div className="lg:col-span-5">
            <div className="bg-white rounded-4xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 md:p-10 sticky top-28">
              <div className="mb-8">
                <h3 className="text-xl font-bold text-slate-800 mb-1 text-left">New Entry</h3>
                <p className="text-sm text-slate-400 font-medium text-left">Populate the PostgreSQL table</p>
              </div>

              <form onSubmit={addTask} className="space-y-6">
                <div className="space-y-2 text-left">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Task Title</label>
                  <input 
                    className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-5 py-4 text-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white outline-none transition-all duration-300 font-medium"
                    value={newTask.title}
                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                    placeholder="Brief objective..."
                    required
                  />
                </div>
                <div className="space-y-2 text-left">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Description</label>
                  <textarea 
                    className="w-full bg-slate-50 border-2 border-slate-50 rounded-2xl px-5 py-4 text-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 focus:bg-white outline-none transition-all duration-300 min-h-35 resize-none font-medium"
                    value={newTask.description}
                    onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                    placeholder="Describe details..."
                  />
                </div>
                <button 
                  type="submit" 
                  className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold text-sm hover:bg-indigo-600 active:scale-[0.98] transition-all duration-300 shadow-xl shadow-slate-200 flex items-center justify-center gap-2 group"
                >
                  <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" />
                  Execute Commit
                </button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="flex items-center justify-between mb-8 px-2">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Activity size={16} className="text-indigo-500" /> 
                Live Registry
              </h3>
              <div className="px-3 py-1 bg-indigo-100 text-indigo-700 text-[10px] font-black rounded-lg">
                {tasks.length} OBJECTS
              </div>
            </div>

            <div className="space-y-5">
              {loading ? (
                <div className="bg-white p-20 rounded-4xl border border-slate-100 text-center shadow-sm">
                  <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Querying API...</p>
                </div>
              ) : tasks.length === 0 ? (
                <div className="bg-white p-20 rounded-4xl border-2 border-dashed border-slate-200 text-center">
                  <p className="text-slate-300 font-bold uppercase tracking-widest text-xs italic">Registry is empty</p>
                </div>
              ) : (
                tasks.map(task => (
                  <div key={task.id} className="group bg-white p-7 rounded-4xl border border-slate-100 hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-500 relative">
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-4 w-full text-left">
                        <div className="flex items-center gap-3">
                          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                          <h4 className="font-black text-slate-800 text-xl tracking-tight leading-none">{task.title}</h4>
                        </div>
                        
                        {task.description && (
                          <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-100">
                            <p className="text-slate-500 text-sm leading-relaxed font-medium italic">
                              "{task.description}"
                            </p>
                          </div>
                        )}
                        
                        <div className="flex items-center gap-3 pt-2">
                          <span className="text-[10px] font-black text-slate-400 bg-slate-100 px-3 py-1.5 rounded-full uppercase tracking-tighter">
                            Node ID: {task.id}
                          </span>
                          <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-full uppercase tracking-tighter">
                            Status: {task.status}
                          </span>
                        </div>
                      </div>
                      <button 
                        onClick={() => deleteTask(task.id)}
                        className="p-3 text-slate-200 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all duration-300 opacity-0 group-hover:opacity-100 shrink-0"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
