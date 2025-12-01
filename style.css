import React, { useState, useMemo, useCallback, createContext, useContext } from 'react';
import { LayoutGrid, Users, Book, FileText, Calendar, Copy, Save, X, RotateCcw, Trash2, Plus, Edit, CornerDownRight } from 'lucide-react';

// --- UTILITIES NATIVAS DE DATA (Substituindo Moment.js) ---

// Função para formatar Date object
const formatNativeDate = (date, format) => {
    if (!(date instanceof Date) || isNaN(date)) return '';
    const locale = 'pt-BR';

    if (format === 'YYYY-MM-DD') {
        const y = date.getFullYear();
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const d = String(date.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
    }
    
    if (format === 'DD/MMM') {
        return new Intl.DateTimeFormat(locale, { day: '2-digit', month: 'short' }).format(date).replace('.', '');
    }
    
    if (format === 'DD/MM/YYYY') {
         return date.toLocaleDateString(locale);
    }

    if (format === 'dddd') {
         return new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(date);
    }

    return date.toLocaleDateString(locale);
};

// Helper function to get ISO Week number and year
const getISOWeekId = (date) => {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    // Calculate week number
    const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    return d.getUTCFullYear() + '-W' + String(weekNo).padStart(2, '0');
};

// Function to get start of the week (Monday)
const startOfWeek = (date) => {
    const d = new Date(date);
    const day = d.getDay(); // 0 (Sunday) to 6 (Saturday)
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Monday start
    d.setDate(diff);
    d.setHours(0, 0, 0, 0);
    return d;
};

// Function to get end of the week (Friday for class tracking)
const endOfWeek = (date) => {
    const start = startOfWeek(date);
    const end = new Date(start);
    end.setDate(start.getDate() + 4); // Friday of the week
    end.setHours(23, 59, 59, 999);
    return end;
};

// Helper function to check if a date is within a date range (inclusive)
const isBetween = (date, start, end) => {
    // Convert to Date objects for comparison
    const d = new Date(formatNativeDate(new Date(date), 'YYYY-MM-DD'));
    const s = new Date(formatNativeDate(new Date(start), 'YYYY-MM-DD'));
    const e = new Date(formatNativeDate(new Date(end), 'YYYY-MM-DD'));
    return d >= s && d <= e;
};

// Gerador de ID simples para novos cadastros (mock)
const generateId = () => Math.floor(Math.random() * 10000) + Date.now();


// --- DADOS DE ENTRADA FICTÍCIOS ---

const MOCK_PROFESSORS = [
    { id: 7001, name: 'Ana Paula Souza', regime: 'DE', matricula: '7001', prdpgd: { day: 1, shift: 'Tarde' }, block_fino: null },
    { id: 7002, name: 'Bruno César Lima', regime: '40h', matricula: '7002', prdpgd: { day: 2, shift: 'Manhã' }, block_fino: null },
    { id: 7003, name: 'Carla Regina Alves', regime: 'DE', matricula: '7003', prdpgd: { day: 4, shift: 'Tarde' }, block_fino: null },
    { id: 7004, name: 'Daniel M. Santos', regime: '20h', matricula: '7004', prdpgd: null, block_fino: null },
    { id: 7005, name: 'Eliane F. Pereira', regime: 'DE', matricula: '7005', prdpgd: { day: 0, shift: 'Manhã' }, block_fino: null },
];

const MOCK_DISCIPLINES = [
    { id: 'M_1AGRO', disc: 'Matemática I', turma: '1º Agro', profId: 7001, ch_anual: 80, sala_fixa: 'SALA A1', periodo: 'Anual' },
    { id: 'QG_1AGRO', disc: 'Química Geral', turma: '1º Agro', profId: 7004, ch_anual: 120, sala_fixa: 'LAB QUIMICA', periodo: 'Anual' },
    { id: 'II_1INFO', disc: 'Introdução à Info.', turma: '1º Info', profId: 7002, ch_anual: 60, sala_fixa: 'LAB INFO 1', periodo: 'Semestral (1º)' },
    { id: 'LP_2INFO', disc: 'Lógica de Prog.', turma: '2º Info', profId: 7002, ch_anual: 100, sala_fixa: 'LAB INFO 1', periodo: 'Anual' },
    { id: 'PT3_3AGRO', disc: 'Português III', turma: '3º Agro', profId: 7003, ch_anual: 80, sala_fixa: 'SALA A4', periodo: 'Anual' },
    { id: 'BC_1AGRO', disc: 'Biologia Celular', turma: '1º Agro', profId: 7005, ch_anual: 60, sala_fixa: 'SALA A2', periodo: 'Semestral (1º)' },
    { id: 'FIS_2AGRO', disc: 'Física II', turma: '2º Agro', profId: 7001, ch_anual: 80, sala_fixa: 'SALA B1', periodo: 'Anual' },
    { id: 'HIS_3AGRO', disc: 'História', turma: '3º Agro', profId: 7003, ch_anual: 60, sala_fixa: 'SALA A3', periodo: 'Anual' },
];

const MOCK_CALENDAR_DATES = {
    start: '2025-03-03', // Segunda-feira
    end: '2025-12-05',   // Sexta-feira
    holidays: [
        '2025-05-01', // Dia do Trabalho
        '2025-09-07', // Independência
        '2025-11-15', // Proclamação da República
    ],
    recesses: [
        // Exemplo: Recesso de 5 dias em Julho
        { start: '2025-07-14', end: '2025-07-18', name: 'Recesso de Inverno' }
    ]
};

const TIME_SLOTS = [
    { id: 0, time: "07:30 - 08:20", shift: "Manhã" },
    { id: 1, time: "08:20 - 09:10", shift: "Manhã" },
    { id: 2, time: "09:30 - 10:20", shift: "Manhã" },
    { id: 3, time: "10:20 - 11:10", shift: "Manhã" },
    { id: 4, time: "11:10 - 12:00", shift: "Manhã" },
]; 
const DAYS = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];

// Função MOCK de Geração de Horário (Simula o algoritmo de alocação)
const generateInitialSchedule = (disciplines, professors) => {
    // Tentativas de alocação simplificadas
    const simpleAllocation = [
        ['M_1AGRO', 3, 0], ['M_1AGRO', 4, 0], 
        ['QG_1AGRO', 0, 4], ['QG_1AGRO', 2, 4],
        ['II_1INFO', 0, 1], 
        ['LP_2INFO', 1, 3], 
        ['PT3_3AGRO', 3, 3], 
        ['BC_1AGRO', 2, 0], 
        ['FIS_2AGRO', 4, 3], 
        ['HIS_3AGRO', 1, 4],
    ];
    
    const profMap = professors.reduce((acc, p) => ({ ...acc, [p.id]: p }), {});
    
    return simpleAllocation.map(([id, day, slot]) => {
        const disc = disciplines.find(d => d.id === id);
        if (!disc) return null; // Ignora se a disciplina não existe mais
        const prof = profMap[disc.profId];
        if (!prof) return null; // Ignora se o professor não existe mais

        return {
            id: `${id}-${day}-${slot}`,
            disc: disc.disc,
            turma: disc.turma,
            prof: prof.name,
            day: day,
            slot: slot,
            room: disc.sala_fixa,
            disc_id: disc.id,
            prof_id: prof.id,
        };
    }).filter(u => u !== null);
};

// O Horário Base Inicial é gerado no provider para garantir o uso dos dados em state
// const INITIAL_SCHEDULE = generateInitialSchedule(MOCK_DISCIPLINES, MOCK_PROFESSORS);

// --- CORES DA IDENTIDADE VISUAL IF (Azul Escuro/Ciano) ---
const IF_BLUE = 'rgb(25, 76, 114)'; // Um azul institucional forte
const IF_CYAN = 'rgb(0, 150, 175)'; // Um ciano vibrante

// --- 2. CONTEXTO GLOBAL DE HORÁRIOS ---
const ScheduleContext = createContext();

const ScheduleProvider = ({ children }) => {
    // 1. ESTADO DE CADASTRO
    const [professors, setProfessors] = useState(MOCK_PROFESSORS);
    const [disciplines, setDisciplines] = useState(MOCK_DISCIPLINES);
    const [calendarConfig, setCalendarConfig] = useState(MOCK_CALENDAR_DATES);
    const [horariosSemanais, setHorariosSemanais] = useState({});

    // Mapeamento auxiliar (depende de professors e disciplines)
    const discMap = useMemo(() => disciplines.reduce((acc, d) => ({ ...acc, [d.id]: d }), {}), [disciplines]);
    const profMap = useMemo(() => professors.reduce((acc, p) => ({ ...acc, [p.id]: p }), {}), [professors]);

    // 2. HORÁRIO BASE (depende de professors e disciplines)
    // Recalcula o horário base se os cadastros mudarem
    const initialSchedule = useMemo(() => generateInitialSchedule(disciplines, professors), [disciplines, professors]);
    const [horarioBase, setHorarioBase] = useState(initialSchedule);
    
    // Atualiza o horarioBase sempre que os cadastros mudam (para refletir novas aulas)
    React.useEffect(() => {
        setHorarioBase(initialSchedule);
    }, [initialSchedule]);


    // Calcula o total de semanas letivas e os dias não letivos
    const { totalSemanasLetivas, weekMap } = useMemo(() => {
        let current = new Date(calendarConfig.start);
        const end = new Date(calendarConfig.end);
        const weekMap = {}; 
        
        while (current <= end) {
            const dayOfWeek = current.getDay(); 
            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

            if (!isWeekend) {
                const currentWeekId = getISOWeekId(current);
                
                const isRecess = calendarConfig.recesses.some(r =>
                    isBetween(current, r.start, r.end)
                );
                
                const dateString = formatNativeDate(current, 'YYYY-MM-DD');
                const isHoliday = calendarConfig.holidays.includes(dateString);
                
                if (isRecess || isHoliday) {
                    if (!weekMap[currentWeekId] || weekMap[currentWeekId].type === 'Normal') {
                         weekMap[currentWeekId] = {
                            type: 'Ajustada/Recesso', 
                            start: formatNativeDate(startOfWeek(current), 'DD/MMM'),
                            end: formatNativeDate(endOfWeek(current), 'DD/MMM'),
                            reasons: [],
                        };
                    }
                } else if (!weekMap[currentWeekId]) {
                    weekMap[currentWeekId] = {
                        type: 'Normal', 
                        start: formatNativeDate(startOfWeek(current), 'DD/MMM'),
                        end: formatNativeDate(endOfWeek(current), 'DD/MMM'),
                    };
                }
            }
            current.setDate(current.getDate() + 1);
        }

        const semanasNormais = Object.values(weekMap).filter(w => w.type === 'Normal');
        const totalSemanas = semanasNormais.length;

        return { totalSemanasLetivas: totalSemanas, weekMap };
    }, [calendarConfig]);


    const value = useMemo(() => ({
        professors,
        setProfessors, // ADICIONADO para edição
        disciplines,
        setDisciplines, // ADICIONADO para edição
        horarioBase,
        setHorarioBase,
        horariosSemanais,
        setHorariosSemanais,
        calendarConfig,
        setCalendarConfig,
        discMap,
        profMap,
        totalSemanasLetivas,
        weekMap,
        
        // Função que calcula a CH Entregue vs. Prevista
        calculateCHCompliance: () => {
             const adjustedWeeksCount = Object.keys(horariosSemanais).length;
             const baseWeeks = totalSemanasLetivas - adjustedWeeksCount; 
             
             const chPrevista = disciplines.reduce((acc, d) => {
                 // Verifica se o professor existe, se não, usa um placeholder
                 const profName = profMap[d.profId]?.name || `Prof ID: ${d.profId} (Não Encontrado)`;
                 
                 acc[d.id] = { 
                     disc: d.disc, 
                     prof: profName, 
                     prev: d.ch_anual, 
                     delivered: 0, 
                     professor_id: d.profId 
                 };
                 return acc;
             }, {});
             
             // 1. CH Entregue do Horário Base
             const baseClassesPerDiscipline = horarioBase.reduce((acc, aula) => {
                 acc[aula.disc_id] = (acc[aula.disc_id] || 0) + 1;
                 return acc;
             }, {});

             Object.entries(baseClassesPerDiscipline).forEach(([discId, count]) => {
                 if (chPrevista[discId]) {
                    chPrevista[discId].delivered += count * Math.max(0, baseWeeks);
                 }
             });

             // 2. CH Entregue das Semanas Ajustadas
             Object.values(horariosSemanais).forEach(semana => {
                 semana.forEach(aula => {
                     const discId = aula.disc_id;
                     if (chPrevista[discId]) {
                        chPrevista[discId].delivered += 1;
                     }
                 });
             });


             // 3. Calcula o Saldo
             return Object.values(chPrevista).map(item => ({
                 ...item,
                 balance: item.delivered - item.prev
             })).sort((a, b) => a.disc.localeCompare(b.disc));
        }
    }), [professors, disciplines, horarioBase, horariosSemanais, calendarConfig, totalSemanasLetivas, weekMap, profMap]);

    return (
        <ScheduleContext.Provider value={value}>
            {children}
        </ScheduleContext.Provider>
    );
};

// --- 3. COMPONENTES DE NAVEGAÇÃO E LAYOUT ---

const Header = () => (
    <header className="py-4 px-6 shadow-md" style={{ backgroundColor: IF_BLUE }}>
        <div className="text-white font-extrabold text-xl tracking-wider">
            INSTITUTO FEDERAL DE RONDÔNIA
        </div>
        <div className="text-sm font-semibold text-cyan-300 ml-4">
            CAMPUS CACOAL
        </div>
        <div className="mt-3 text-sm font-medium text-gray-200">
            COORDENAÇÃO DE GESTÃO DE HORÁRIOS
        </div>
    </header>
);

const Sidebar = ({ activeTab, setActiveTab }) => {
    const navItems = [
        { id: 'Cadastros', icon: <Users size={18} />, label: '1 - Cadastros' },
        { id: 'Relatorios', icon: <FileText size={18} />, label: '2 - Relatórios' },
        { id: 'HorarioBase', icon: <LayoutGrid size={18} />, label: '3 - Horário Base' },
        { id: 'HorariosSemanais', icon: <Calendar size={18} />, label: '4 - Horários Semanais' },
    ];

    return (
        <div className="w-56 h-full bg-gray-800 p-4 flex flex-col shadow-xl">
            {navItems.map(item => (
                <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center space-x-3 p-3 my-1 rounded-lg transition duration-200 
                        ${activeTab === item.id ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                >
                    {item.icon}
                    <span className="font-medium text-sm">{item.label}</span>
                </button>
            ))}
        </div>
    );
};

// --- 4. COMPONENTES FUNCIONAIS DA APLICAÇÃO ---

// Componente Básico de Aula para Drag and Drop
const ClassUnit = ({ unit, onDragStart, isDraggable = true, onRemove }) => {
    const isRemovable = !!onRemove;
    
    return (
        <div
            className="bg-blue-500 text-white p-1 text-xs rounded shadow-md transition duration-150 relative"
            draggable={isDraggable}
            onDragStart={isDraggable ? ((e) => {
                // Passa o ID da unidade arrastada
                e.dataTransfer.setData('text/plain', unit.id);
                onDragStart(unit.id);
            }) : undefined}
            style={{ cursor: isDraggable ? 'grab' : 'default', backgroundColor: IF_CYAN }}
        >
            <div className="font-semibold truncate">{unit.disc}</div>
            <div className="text-gray-900 text-xs italic truncate bg-white bg-opacity-70 rounded px-1 mt-0.5">{unit.turma} | {unit.prof}</div>
            {isRemovable && (
                <button 
                    onClick={() => onRemove(unit.id)}
                    className="absolute -top-1 -right-1 bg-red-600 rounded-full p-0.5 leading-none hover:bg-red-700 transition shadow"
                    title="Remover Aula da Semana"
                >
                    <X size={10} />
                </button>
            )}
        </div>
    );
}

// Componente Célula de Horário
const ScheduleCell = ({ unit, onDrop, dayIndex, slotIndex, isBase, profMap }) => {
    const [isDragOver, setIsDragOver] = useState(false);
    
    // Verifica se a célula tem um bloqueio de PRD/PGD ou Fino
    const isRestricted = useMemo(() => {
        // Simulação: Bloqueio Fixo (Ex: Sala indisponível)
        if (dayIndex === 1 && slotIndex === 0) return { type: 'Fixo', reason: 'Manutenção da Sala 101' };
        return false;
    }, [dayIndex, slotIndex]);

    const canDrop = useMemo(() => {
        if (unit) return false; 
        if (isRestricted) return false;
        return true; 
    }, [unit, isRestricted]);

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        const draggedId = e.dataTransfer.getData('text/plain');
        
        if (isRestricted) {
             console.error(`Validação: Este slot está permanentemente restrito. Motivo: ${isRestricted.reason}`);
             return;
        }

        if (unit) {
            console.error("Erro: O slot já está ocupado por outra aula.");
            return;
        }
        
        // Simulação de verificação de restrições do PROFESSOR
        // Nota: Esta parte está simplificada. Em um app real, o ID arrastado precisa ser mapeado para o objeto aula
        // ou o objeto aula precisa ser transferido no dragStart. Aqui, usamos MOCK_DISCIPLINES para simular.
        const draggedUnitMock = MOCK_DISCIPLINES.find(d => draggedId.includes(d.id.split('-')[0]));
        
        if (draggedUnitMock) {
            const targetProf = profMap[draggedUnitMock.profId];
            const timeSlot = TIME_SLOTS[slotIndex];

            // 1. Bloqueio Fino do Professor
            if (targetProf?.block_fino && targetProf.block_fino.day === dayIndex && targetProf.block_fino.slot === slotIndex) {
                alert(`Validação: Professor ${targetProf.name} tem Bloqueio Fino agendado neste horário.`);
                return;
            }

            // 2. Bloqueio PRD/PGD do Professor
            if (targetProf?.prdpgd && targetProf.prdpgd.day === dayIndex && targetProf.prdpgd.shift === timeSlot.shift) {
                alert(`Validação: Professor ${targetProf.name} está em Jornada PRD/PGD no turno da ${DAYS[dayIndex]}.`);
                return;
            }
        }
            
        onDrop(draggedId, dayIndex, slotIndex); // Finaliza o movimento
    };

    const getBgColor = () => {
        if (unit) return 'bg-gray-100';
        if (isRestricted) return 'bg-red-100/50 border border-red-500';
        if (isDragOver && canDrop) return 'bg-green-200 border-green-500 border-2';
        if (isDragOver && !canDrop) return 'bg-red-200 border-red-500 border-2';
        return 'bg-white';
    }

    return (
        <div
            className={`h-full p-1 border border-gray-200 min-h-16 relative ${getBgColor()}`}
            title={isRestricted ? isRestricted.reason : undefined}
            onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
        >
            {unit && <ClassUnit unit={unit} onDragStart={() => console.log('Arrastando aula:', unit.id)} onRemove={!isBase ? () => console.log('Removendo (use drag para lixeira)') : null} />}
            {isRestricted && <span className="absolute top-0 left-1 text-red-600 text-xs font-bold" title={isRestricted.reason}>RESTRITO</span>}
        </div>
    );
};

// Componente Genérico de Matriz de Horários
const ScheduleMatrix = ({ schedule, onDrop, title, isBase }) => {
    const { profMap } = useContext(ScheduleContext);
    
    // Se não for base, não é possível arrastar/soltar, então onDrop deve ser um no-op
    const finalOnDrop = isBase ? onDrop : () => {};

    const scheduleMap = useMemo(() => {
        const map = {};
        schedule.forEach(unit => {
            if (unit.day >= 0 && unit.slot >= 0) { 
                if (!map[unit.day]) map[unit.day] = {};
                map[unit.day][unit.slot] = unit;
            }
        });
        return map;
    }, [schedule]);

    return (
        <div className="shadow-lg rounded-lg bg-white p-4">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">{title}</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-blue-100 sticky top-0">
                        <tr>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider w-32">Horário</th>
                            {DAYS.map((day, index) => (
                                <th key={index} className="px-3 py-2 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                                    {day}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {TIME_SLOTS.map((slot, slotIndex) => (
                            <tr key={slot.id} className={`${slot.shift === 'Manhã' ? 'bg-white' : 'bg-gray-50'}`}>
                                <td className="px-3 py-1 whitespace-nowrap text-sm font-medium text-gray-900 w-32">
                                    <div className="text-xs text-gray-500">{slot.shift}</div>
                                    {slot.time}
                                </td>
                                {DAYS.map((_, dayIndex) => {
                                    const unit = scheduleMap[dayIndex] ? scheduleMap[dayIndex][slotIndex] : null;
                                    return (
                                        <td key={dayIndex} className="p-0 h-16 w-40 align-top">
                                            <ScheduleCell
                                                dayIndex={dayIndex}
                                                slotIndex={slotIndex}
                                                unit={unit}
                                                onDrop={finalOnDrop}
                                                isBase={isBase}
                                                profMap={profMap}
                                            />
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

// 3 - Horário Base
const HorarioBasePage = () => {
    const { horarioBase, setHorarioBase } = useContext(ScheduleContext);
    
    const handleBaseDrop = (draggedId, newDay, newSlot) => {
        const draggedUnit = horarioBase.find(u => u.id === draggedId);
        if (!draggedUnit) return;
        
        const isOccupied = horarioBase.some(unit => 
            unit.day === newDay && unit.slot === newSlot
        );
        if (isOccupied) return;

        const newSchedule = horarioBase.map(unit =>
            unit.id === draggedId ? { ...unit, day: newDay, slot: newSlot } : unit
        );
        setHorarioBase(newSchedule);
        console.log('Movimento Válido no Horário Base.');
    };
    
    const handleSave = () => {
        // Implementar persistência (Firebase) aqui
        alert('Horário Base salvo com sucesso. Ele será usado como modelo para as semanas!');
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold text-gray-800">3 - Horário Base (Matriz Mestra)</h1>
                <button onClick={handleSave} className="flex items-center bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition">
                    <Save size={18} className="mr-2" /> Salvar Horário Base
                </button>
            </div>
            
            <ScheduleMatrix 
                schedule={horarioBase} 
                onDrop={handleBaseDrop} 
                title="Horário Base: Alocação Inicial (Arraste para Ajustar)" 
                isBase={true}
            />

            <div className="mt-6 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 rounded-lg">
                <p className="font-semibold">AVISO: Validações Ativas</p>
                <p className="text-sm">Tente arrastar uma aula para um slot que já tem outra aula ou para um slot restrito (Ex: Bloqueio Fino de um professor). O sistema deve bloquear.</p>
            </div>
        </div>
    );
};

// 4 - Horários Semanais
const HorariosSemanaisPage = () => {
    const { horarioBase, horariosSemanais, setHorariosSemanais, weekMap } = useContext(ScheduleContext);
    
    const weekOptions = useMemo(() => {
        // Transforma o weekMap em um array de opções ordenadas
        return Object.entries(weekMap).map(([id, data]) => ({
            id: id,
            label: `Semana ${id.split('-W')[1]} (${data.start} a ${data.end}) - ${data.type}`,
            type: data.type
        })).sort((a, b) => {
            const numA = parseInt(a.id.split('-W')[1]);
            const numB = parseInt(b.id.split('-W')[1]);
            return numA - numB;
        });
    }, [weekMap]);

    const [selectedWeek, setSelectedWeek] = useState(weekOptions[0]?.id || '2025-W01'); 
    
    // Atualiza a semana selecionada se a lista de opções mudar
    React.useEffect(() => {
        if (weekOptions.length > 0 && !weekOptions.find(w => w.id === selectedWeek)) {
            setSelectedWeek(weekOptions[0].id);
        }
    }, [weekOptions, selectedWeek]);
    
    const currentWeeklySchedule = useMemo(() => {
        return horariosSemanais[selectedWeek] || horarioBase;
    }, [horariosSemanais, selectedWeek, horarioBase]);

    const unallocatedUnits = useMemo(() => {
        const currentScheduleIds = currentWeeklySchedule.map(u => u.id);
        
        // Aulas base que não estão na semana (foram removidas)
        const removedUnits = horarioBase.filter(u => !currentScheduleIds.includes(u.id));

        // Mock de Aulas Extra que podem ser adicionadas (fora do horário base)
        // Essas aulas precisam de um Prof. ID e Disc. ID válidos
        const extraUnits = [
            { id: 'EXTRA-1', disc: 'Geometria Extra', turma: '1º Agro', prof: 'Ana Paula Souza', day: -1, slot: -1, room: 'SALA 302', disc_id: 'M_1AGRO', prof_id: 7001 },
            { id: 'EXTRA-2', disc: 'Laboratório', turma: 'Zootecnia', prof: 'Bruno César Lima', day: -1, slot: -1, room: 'LAB 101', disc_id: 'LP_2INFO', prof_id: 7002 },
        ];

        // Filtra aulas extras que já foram alocadas nesta semana
        const availableExtras = extraUnits.filter(e => !currentScheduleIds.includes(e.id));

        return [...removedUnits, ...availableExtras];
    }, [currentWeeklySchedule, horarioBase]);

    const duplicateBase = () => {
        if (horariosSemanais[selectedWeek]) {
            alert(`O Horário da ${selectedWeek} já existe.`);
            return;
        }
        setHorariosSemanais({
            ...horariosSemanais,
            [selectedWeek]: JSON.parse(JSON.stringify(horarioBase)) 
        });
        alert(`Horário Base copiado para a semana ${selectedWeek}! Faça os ajustes finos.`);
    };
    
    const handleWeeklyDrop = (draggedId, newDay, newSlot) => {
        if (!horariosSemanais[selectedWeek]) {
            alert('Erro: Duplique o Horário Base primeiro para esta semana.');
            return;
        }

        const currentWeekData = horariosSemanais[selectedWeek];
        const isOccupied = currentWeekData.some(unit => unit.day === newDay && unit.slot === newSlot);
        if (isOccupied) return;

        let updatedSchedule = [];
        const isNewUnit = unallocatedUnits.some(u => u.id === draggedId);
        const draggedUnit = currentWeekData.find(u => u.id === draggedId) || unallocatedUnits.find(u => u.id === draggedId);
        
        if (!draggedUnit) return; 

        if (isNewUnit) {
            // Se for uma unidade nova (extra ou que estava na lixeira)
            // Mantém o ID original para extras, ou usa um novo ID baseado em disc_id/dia/slot
            const newId = draggedUnit.id.includes('EXTRA') ? draggedUnit.id : `${draggedUnit.disc_id}-${newDay}-${newSlot}-${generateId()}`;

            const addedUnit = { 
                ...draggedUnit, 
                day: newDay, 
                slot: newSlot, 
                id: newId,
                // Garantir que disc_id e prof_id estão corretos para cálculo de CH
                disc_id: draggedUnit.disc_id,
                prof_id: draggedUnit.prof_id
            };
            updatedSchedule = [...currentWeekData, addedUnit];
        } else {
            // Se for uma unidade que estava no horário, apenas move
            updatedSchedule = currentWeekData.map(unit =>
                unit.id === draggedId ? { ...unit, day: newDay, slot: newSlot } : unit
            );
        }

        setHorariosSemanais({
            ...horariosSemanais,
            [selectedWeek]: updatedSchedule
        });
    };
    
    // Ação de Retirar Aula (drag para lixeira)
    const handleRemoveFromWeek = (draggedId) => {
        if (!horariosSemanais[selectedWeek]) return;
        const filteredSchedule = horariosSemanais[selectedWeek].filter(u => u.id !== draggedId);
        setHorariosSemanais({
            ...horariosSemanais,
            [selectedWeek]: filteredSchedule
        });
        console.log(`Aula ${draggedId} removida da semana ${selectedWeek}. CH será descontada.`);
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">4 - Horários Semanais (Ajuste Fino e Controle de CH)</h1>
            
            <div className="flex space-x-4 mb-6 p-4 border rounded-lg bg-white shadow-sm items-center">
                <label className="font-semibold text-gray-700">Semana Selecionada:</label>
                <select 
                    value={selectedWeek} 
                    onChange={(e) => setSelectedWeek(e.target.value)}
                    className="p-2 border rounded-md min-w-80 bg-gray-50"
                >
                    {weekOptions.map(w => (
                        <option key={w.id} value={w.id}>{w.label}</option>
                    ))}
                </select>
                
                <button 
                    onClick={duplicateBase} 
                    disabled={!!horariosSemanais[selectedWeek] || weekMap[selectedWeek]?.type !== 'Normal'}
                    className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg shadow disabled:opacity-50 hover:bg-indigo-700 transition"
                >
                    <Copy size={18} className="mr-2" />
                    {horariosSemanais[selectedWeek] ? 'Horário Duplicado' : 'Duplicar Horário Base'}
                </button>
                
                {horariosSemanais[selectedWeek] && (
                    <button 
                        onClick={() => {
                            if(window.confirm(`Tem certeza que deseja apagar os ajustes desta semana e recarregar o Horário Base?`)) {
                                setHorariosSemanais(prev => { 
                                    const newPrev = {...prev}; 
                                    delete newPrev[selectedWeek]; 
                                    return newPrev; 
                                });
                            }
                        }}
                        className="flex items-center bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition"
                    >
                        <RotateCcw size={18} className="mr-2" />
                        Resetar Semana
                    </button>
                )}
            </div>
            
            <ScheduleMatrix 
                schedule={currentWeeklySchedule} 
                onDrop={handleWeeklyDrop} 
                title={`Horário Ajustável para: ${selectedWeek} ${horariosSemanais[selectedWeek] ? '(Ajustado - CH em alteração)' : '(Base - CH em Dia)'}`} 
                isBase={!horariosSemanais[selectedWeek]}
            />
            
            <div className="mt-6 p-4 bg-gray-200 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Aulas para Inclusão/Retirada</h3>
                <div className="flex flex-wrap items-center space-x-4">
                    <div className="bg-red-200 border-2 border-red-500 p-4 rounded-lg flex flex-col items-center justify-center w-32 h-20 shadow-inner"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleRemoveFromWeek(e.dataTransfer.getData('text/plain'))}
                    >
                        <Trash2 size={24} className="text-red-600" />
                        <span className="mt-1 text-xs text-red-600 font-semibold text-center">ARRASTE AULA PARA RETIRAR</span>
                    </div>
                    {unallocatedUnits.map(unit => (
                        <div key={unit.id} className="w-40 my-2">
                           <ClassUnit 
                                key={unit.id} 
                                unit={unit} 
                                onDragStart={() => console.log('Arrastando aula extra:', unit.id)} 
                                isDraggable={true}
                            />
                        </div>
                    ))}
                    <span className="text-sm text-gray-700 italic ml-4">
                        (Aulas removidas ou aulas extras disponíveis)
                    </span>
                </div>
            </div>
        </div>
    );
};

// ----------------------------------------------------------------------
// NOVOS COMPONENTES DE RELATÓRIO
// ----------------------------------------------------------------------

const IndividualReportView = () => {
    const { horarioBase, professors, disciplines, profMap, totalSemanasLetivas } = useContext(ScheduleContext);
    const [entityType, setEntityType] = useState('professor'); // 'professor' or 'turma'
    const [selectedEntityId, setSelectedEntityId] = useState('');

    // Prepara a lista de turmas únicas
    const uniqueTurmas = useMemo(() => {
        return [...new Set(disciplines.map(d => d.turma))].sort();
    }, [disciplines]);
    
    // Lista de entidades baseada no tipo selecionado
    const entities = useMemo(() => {
        if (entityType === 'professor') {
            return professors.map(p => ({ id: p.id, name: p.name }));
        }
        if (entityType === 'turma') {
            return uniqueTurmas.map(t => ({ id: t, name: t }));
        }
        return [];
    }, [entityType, professors, uniqueTurmas]);

    // Horário filtrado para a entidade selecionada (apenas horário base para simulação)
    const filteredSchedule = useMemo(() => {
        if (!selectedEntityId) return [];

        return horarioBase.filter(aula => {
            if (entityType === 'professor') {
                return aula.prof_id === parseInt(selectedEntityId);
            }
            if (entityType === 'turma') {
                return aula.turma === selectedEntityId;
            }
            return false;
        });
    }, [horarioBase, entityType, selectedEntityId]);
    
    // Sumário de CH para a entidade selecionada
    const chSummary = useMemo(() => {
        if (!selectedEntityId) return null;
        
        let totalCH = 0;
        let totalPrevista = 0;
        let entityName = '';
        
        if (entityType === 'professor') {
            const prof = profMap[selectedEntityId];
            entityName = prof ? prof.name : 'N/A';
            
            disciplines.filter(d => d.profId === parseInt(selectedEntityId)).forEach(d => {
                totalPrevista += d.ch_anual;
            });

        } else if (entityType === 'turma') {
            entityName = selectedEntityId;
            
            disciplines.filter(d => d.turma === selectedEntityId).forEach(d => {
                totalPrevista += d.ch_anual;
            });
        }
        
        // Simulação de CH Entregue baseada no horário base (Aulas/semana * total semanas)
        const classesPerWeek = filteredSchedule.length;
        totalCH = classesPerWeek * totalSemanasLetivas;

        return { entityName, totalCH, totalPrevista, balance: totalCH - totalPrevista };

    }, [selectedEntityId, entityType, disciplines, profMap, filteredSchedule, totalSemanasLetivas]);
    
    
    const exportToCSV = useCallback(() => {
        if (!chSummary) {
             alert('Selecione um Professor ou Turma primeiro.');
             return;
        }
        
        const scheduleData = filteredSchedule.map(aula => [
            DAYS[aula.day],
            TIME_SLOTS[aula.slot].time,
            aula.disc,
            aula.turma,
            aula.prof,
            aula.room
        ]);

        const header = ['Dia', 'Horário', 'Disciplina', 'Turma', 'Professor', 'Sala'];
        const csvContent = [
            `Relatório Individual de ${entityType === 'professor' ? 'Professor' : 'Turma'} - ${chSummary.entityName}`,
            `CH Prevista (Anual), ${chSummary.totalPrevista}`,
            `CH Entregue (Simulada), ${chSummary.totalCH}`,
            `Saldo, ${chSummary.balance}`,
            '',
            header.join(';'),
            ...scheduleData.map(row => row.join(';'))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `relatorio_${entityType}_${chSummary.entityName.replace(/\s/g, '_')}.csv`;
        link.click();
        
        alert(`Relatório de ${chSummary.entityName} exportado para CSV!`);
    }, [chSummary, filteredSchedule, entityType]);


    return (
        <div className="mt-4 p-4 border rounded-lg shadow-md bg-white">
            <div className="flex space-x-4 mb-4 items-end">
                <div className='flex flex-col'>
                    <label className="text-sm font-medium text-gray-700">Tipo de Relatório</label>
                    <select
                        value={entityType}
                        onChange={(e) => {
                            setEntityType(e.target.value);
                            setSelectedEntityId('');
                        }}
                        className="p-2 border rounded-md"
                    >
                        <option value="professor">Professor</option>
                        <option value="turma">Turma</option>
                    </select>
                </div>
                
                <div className='flex flex-col flex-grow'>
                    <label className="text-sm font-medium text-gray-700">
                        {entityType === 'professor' ? 'Selecionar Professor' : 'Selecionar Turma'}
                    </label>
                    <select
                        value={selectedEntityId}
                        onChange={(e) => setSelectedEntityId(e.target.value)}
                        className="p-2 border rounded-md"
                    >
                        <option value="">-- Selecione uma Entidade --</option>
                        {entities.map(e => (
                            <option key={e.id} value={e.id}>{e.name}</option>
                        ))}
                    </select>
                </div>
                
                <button 
                    onClick={exportToCSV}
                    disabled={!selectedEntityId}
                    className="flex items-center bg-teal-600 text-white px-4 py-2 rounded-lg shadow disabled:opacity-50 hover:bg-teal-700 transition"
                >
                    <Copy size={18} className="mr-2" />
                    Exportar Relatório (CSV)
                </button>
            </div>
            
            {chSummary && (
                <div className='mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg'>
                    <h4 className='text-lg font-bold text-blue-800 mb-2'>{chSummary.entityName} - Sumário Anual</h4>
                    <div className='flex space-x-6 text-sm'>
                        <div><span className='font-semibold'>CH Prevista (Aulas):</span> {chSummary.totalPrevista}</div>
                        <div><span className='font-semibold'>CH Entregue (Simulada):</span> {chSummary.totalCH}</div>
                        <div><span className='font-semibold'>Saldo:</span> <span className={chSummary.balance < 0 ? 'text-red-600 font-bold' : 'text-green-600 font-bold'}>{chSummary.balance}</span></div>
                    </div>
                </div>
            )}
            
            {selectedEntityId && (
                 <ScheduleMatrix 
                    schedule={filteredSchedule} 
                    onDrop={() => {}} // Não permite drop neste relatório
                    title={`Horário Padrão (${chSummary.entityName})`} 
                    isBase={false} // Desabilita o drag and drop na visualização
                 />
            )}
            
            {!selectedEntityId && (
                <div className="text-center p-10 bg-gray-50 rounded-lg text-gray-500">
                    Selecione um Professor ou Turma para visualizar o relatório e o horário semanal.
                </div>
            )}
        </div>
    );
};

// 2 - Relatórios
const RelatoriosPage = () => {
    const { calculateCHCompliance, totalSemanasLetivas } = useContext(ScheduleContext);
    const complianceData = calculateCHCompliance();
    const [subTab, setSubTab] = useState('CHCompliance');
    
    const exportComplianceCSV = () => {
        const header = ['Disciplina', 'Professor', 'CH Prevista', 'CH Entregue (Simulada)', 'Saldo (Aulas a Compensar)'];
        const csvContent = [
            `Relatório de Cumprimento de CH (Prevista vs. Entregue) - ${totalSemanasLetivas} Semanas Letivas`,
            header.join(';'),
            ...complianceData.map(data => [
                data.disc,
                data.prof,
                data.prev,
                data.delivered,
                data.balance
            ].join(';'))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `relatorio_ch_compliance.csv`;
        link.click();
        
        alert('Relatório de Conformidade de CH exportado para CSV!');
    };
    
    const renderSubContent = () => {
        switch(subTab) {
            case 'CHCompliance':
                return (
                    <div className="p-4 border rounded-lg shadow-md bg-white">
                        <div className='flex justify-between items-center mb-3'>
                            <h3 className="text-xl font-semibold flex items-center"><FileText size={20} className="mr-2 text-blue-600"/> 1. Relatório de Cumprimento de CH (Geral)</h3>
                            <button 
                                onClick={exportComplianceCSV}
                                className="flex items-center bg-teal-600 text-white px-4 py-2 rounded-lg shadow hover:bg-teal-700 transition text-sm"
                            >
                                <Copy size={18} className="mr-2" />
                                Exportar Tabela (CSV)
                            </button>
                        </div>
                        <p className="mb-4 text-sm text-gray-500 italic">Os dados abaixo usam uma simulação de **{totalSemanasLetivas} semanas letivas**, contando todas as alterações.</p>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 text-sm">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-2 text-left">Disciplina</th>
                                        <th className="px-4 py-2 text-left">Professor</th>
                                        <th className="px-4 py-2 text-center">CH Prevista</th>
                                        <th className="px-4 py-2 text-center">CH Entregue (Simulada)</th>
                                        <th className="px-4 py-2 text-center">Saldo (Aulas a Comp.)</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {complianceData.map((data, index) => (
                                        <tr key={index} className={data.balance < 0 ? 'bg-red-50' : data.balance > 0 ? 'bg-green-50' : 'bg-white'}>
                                            <td className="px-4 py-2">{data.disc}</td>
                                            <td className="px-4 py-2">{data.prof}</td>
                                            <td className="px-4 py-2 text-center">{data.prev}</td>
                                            <td className="px-4 py-2 text-center">{data.delivered}</td>
                                            <td className={`px-4 py-2 text-center font-bold ${data.balance < 0 ? 'text-red-600' : data.balance > 0 ? 'text-green-600' : 'text-gray-700'}`}>
                                                {data.balance}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <p className="mt-4 text-xs text-gray-500">Saldo negativo: Faltam aulas. Saldo positivo: Aulas excedentes (compensação de sábados, por exemplo).</p>
                    </div>
                );
            case 'Individual':
                return <IndividualReportView />;
            default:
                return null;
        }
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">2 - Relatórios de Saída</h1>
            
            <div className="flex space-x-2 mb-6 border-b pb-0">
                <TabButton 
                    icon={<FileText size={18}/>} 
                    label="Cumprimento de CH (Geral)" 
                    active={subTab === 'CHCompliance'} 
                    onClick={() => setSubTab('CHCompliance')} 
                />
                <TabButton 
                    icon={<Users size={18}/>} 
                    label="Relatórios Individuais (Prof/Turma + CSV)" 
                    active={subTab === 'Individual'} 
                    onClick={() => setSubTab('Individual')} 
                />
            </div>
            
            {renderSubContent()}
        </div>
    );
};

// ----------------------------------------------------------------------
// COMPONENTES DE CADASTRO (Mantidos)
// ----------------------------------------------------------------------

const ProfessorForm = () => {
    const { setProfessors } = useContext(ScheduleContext);
    const [name, setName] = useState('');
    const [regime, setRegime] = useState('DE');
    const [matricula, setMatricula] = useState('');
    const [isAdding, setIsAdding] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !matricula || !regime) {
            alert('Por favor, preencha o nome, matrícula e regime.');
            return;
        }

        const newId = generateId(); // ID mockado
        
        const newProfessor = {
            id: newId,
            name: name.trim(),
            regime: regime,
            matricula: matricula.trim(),
            prdpgd: null, // Pode ser adicionado em uma tela de edição futura
            block_fino: null, // Pode ser adicionado em uma tela de edição futura
        };

        setProfessors(prev => [...prev, newProfessor]);
        setName('');
        setMatricula('');
        setRegime('DE');
        setIsAdding(false);
        console.log('Novo professor cadastrado:', newProfessor);
    };

    if (!isAdding) {
        return (
            <button 
                onClick={() => setIsAdding(true)}
                className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition mb-4"
            >
                <Plus size={18} className="mr-2" /> Adicionar Novo Professor
            </button>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="bg-blue-50 p-4 rounded-lg shadow-inner mb-6 border border-blue-200">
            <h3 className="text-lg font-semibold mb-3 text-blue-800 flex items-center">
                <CornerDownRight size={20} className="mr-2"/> Cadastro de Professor
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input 
                    type="text" 
                    placeholder="Nome Completo"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="p-2 border rounded"
                    required
                />
                <input 
                    type="text" 
                    placeholder="Matrícula SIAPE (Ex: 1234)"
                    value={matricula}
                    onChange={(e) => setMatricula(e.target.value)}
                    className="p-2 border rounded"
                    required
                />
                <select
                    value={regime}
                    onChange={(e) => setRegime(e.target.value)}
                    className="p-2 border rounded"
                >
                    <option value="DE">Dedicação Exclusiva (DE)</option>
                    <option value="40h">40 horas</option>
                    <option value="20h">20 horas</option>
                </select>
                <div className="flex space-x-2">
                    <button type="submit" className="flex-1 bg-green-600 text-white p-2 rounded hover:bg-green-700 transition">
                        Salvar
                    </button>
                    <button type="button" onClick={() => setIsAdding(false)} className="bg-gray-400 text-white p-2 rounded hover:bg-gray-500 transition">
                        <X size={18} />
                    </button>
                </div>
            </div>
            <p className='text-xs text-gray-500 mt-2 italic'>Restrições (PRD/PGD/Bloqueio Fino) devem ser configuradas na tela de edição (futuramente).</p>
        </form>
    );
};

const DisciplineForm = () => {
    const { setDisciplines, professors } = useContext(ScheduleContext);
    const [disc, setDisc] = useState('');
    const [turma, setTurma] = useState('');
    const [profId, setProfId] = useState('');
    const [chAnual, setChAnual] = useState('');
    const [salaFixa, setSalaFixa] = useState('');
    const [periodo, setPeriodo] = useState('Anual');
    const [isAdding, setIsAdding] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!disc || !turma || !profId || !chAnual) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        const newId = disc.toUpperCase().replace(/\s/g, '_') + '_' + turma.replace(/\s/g, ''); 
        
        const newDiscipline = {
            id: newId,
            disc: disc.trim(),
            turma: turma.trim(),
            profId: parseInt(profId),
            ch_anual: parseInt(chAnual),
            sala_fixa: salaFixa.trim() || 'A definir',
            periodo: periodo,
        };

        setDisciplines(prev => [...prev, newDiscipline]);
        setDisc('');
        setTurma('');
        setProfId('');
        setChAnual('');
        setSalaFixa('');
        setPeriodo('Anual');
        setIsAdding(false);
        console.log('Nova disciplina cadastrada:', newDiscipline);
    };
    
    if (!isAdding) {
        return (
            <button 
                onClick={() => setIsAdding(true)}
                className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition mb-4"
            >
                <Plus size={18} className="mr-2" /> Adicionar Nova Disciplina
            </button>
        );
    }


    return (
        <form onSubmit={handleSubmit} className="bg-blue-50 p-4 rounded-lg shadow-inner mb-6 border border-blue-200">
            <h3 className="text-lg font-semibold mb-3 text-blue-800 flex items-center">
                <CornerDownRight size={20} className="mr-2"/> Cadastro de Disciplina
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <input 
                    type="text" 
                    placeholder="Nome da Disciplina (Ex: Cálculo I)"
                    value={disc}
                    onChange={(e) => setDisc(e.target.value)}
                    className="p-2 border rounded col-span-2"
                    required
                />
                <input 
                    type="text" 
                    placeholder="Turma (Ex: 1º Info)"
                    value={turma}
                    onChange={(e) => setTurma(e.target.value)}
                    className="p-2 border rounded"
                    required
                />
                <select
                    value={profId}
                    onChange={(e) => setProfId(e.target.value)}
                    className="p-2 border rounded col-span-2"
                    required
                >
                    <option value="">-- Selecione o Professor --</option>
                    {professors.map(p => (
                        <option key={p.id} value={p.id}>
                            {p.name} ({p.regime})
                        </option>
                    ))}
                </select>
                <input 
                    type="number" 
                    placeholder="CH Anual (Aulas)"
                    value={chAnual}
                    onChange={(e) => setChAnual(e.target.value)}
                    className="p-2 border rounded"
                    min="1"
                    required
                />
                <input 
                    type="text" 
                    placeholder="Sala Fixa (Ex: LAB 101)"
                    value={salaFixa}
                    onChange={(e) => setSalaFixa(e.target.value)}
                    className="p-2 border rounded"
                />
                <select
                    value={periodo}
                    onChange={(e) => setPeriodo(e.target.value)}
                    className="p-2 border rounded"
                >
                    <option value="Anual">Anual</option>
                    <option value="Semestral (1º)">Semestral (1º)</option>
                    <option value="Semestral (2º)">Semestral (2º)</option>
                </select>
                <div className="flex space-x-2 col-span-2">
                    <button type="submit" className="flex-1 bg-green-600 text-white p-2 rounded hover:bg-green-700 transition">
                        Salvar
                    </button>
                    <button type="button" onClick={() => setIsAdding(false)} className="bg-gray-400 text-white p-2 rounded hover:bg-gray-500 transition">
                        <X size={18} />
                    </button>
                </div>
            </div>
            <p className='text-xs text-gray-500 mt-2 italic'>CH Anual é a Carga Horária total da disciplina em número de aulas (1 aula = 50min).</p>
        </form>
    );
};


// 1 - Cadastros (Sub-componentes)

const RecessoEditor = ({ recessos, setRecessos }) => {
    const [newRecesso, setNewRecesso] = useState({ name: '', start: '', end: '' });

    const addRecesso = () => {
        if (newRecesso.name && newRecesso.start && newRecesso.end) {
            setRecessos([...recessos, newRecesso]);
            setNewRecesso({ name: '', start: '', end: '' });
        }
    };

    const removeRecesso = (index) => {
        setRecessos(recessos.filter((_, i) => i !== index));
    };

    return (
        <div className="mt-4 p-4 border rounded-lg bg-gray-50">
            <h4 className="font-semibold text-lg mb-2">Períodos de Recesso / Férias</h4>
            <div className="space-y-2">
                {recessos.map((r, index) => (
                    <div key={index} className="flex justify-between items-center bg-white p-2 rounded shadow-sm border">
                        <span>{r.name}: {formatNativeDate(new Date(r.start), 'DD/MM/YYYY')} a {formatNativeDate(new Date(r.end), 'DD/MM/YYYY')}</span>
                        <button onClick={() => removeRecesso(index)} className="text-red-500 hover:text-red-700 p-1">
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
            </div>

            <div className="mt-4 border-t pt-3 space-y-2">
                <h5 className="text-sm font-medium">Adicionar Novo Recesso</h5>
                <input 
                    type="text" 
                    placeholder="Nome do Recesso (Ex: Férias de Julho)"
                    value={newRecesso.name}
                    onChange={(e) => setNewRecesso({...newRecesso, name: e.target.value})}
                    className="w-full p-2 border rounded text-sm"
                />
                <div className="flex space-x-2">
                    <input 
                        type="date" 
                        value={newRecesso.start}
                        onChange={(e) => setNewRecesso({...newRecesso, start: e.target.value})}
                        className="w-1/2 p-2 border rounded text-sm"
                        title="Data de Início"
                    />
                    <input 
                        type="date" 
                        value={newRecesso.end}
                        onChange={(e) => setNewRecesso({...newRecesso, end: e.target.value})}
                        className="w-1/2 p-2 border rounded text-sm"
                        title="Data de Fim"
                    />
                </div>
                <button onClick={addRecesso} className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition flex items-center justify-center">
                    <Plus size={16} className="mr-2"/> Adicionar
                </button>
            </div>
        </div>
    );
};

const CalendarioPage = ({ calendarConfig, setCalendarConfig }) => {
    const { totalSemanasLetivas } = useContext(ScheduleContext);
    const [tempConfig, setTempConfig] = useState(calendarConfig);

    const handleHolidayToggle = (dateString) => {
        if (!dateString) return;
        if (tempConfig.holidays.includes(dateString)) {
            setTempConfig({ 
                ...tempConfig, 
                holidays: tempConfig.holidays.filter(d => d !== dateString) 
            });
        } else {
            setTempConfig({ 
                ...tempConfig, 
                holidays: [...tempConfig.holidays, dateString].sort() 
            });
        }
    };
    
    const handleSave = () => {
        setCalendarConfig(tempConfig);
        alert('Configuração de Calendário salva com sucesso! Os cálculos de CH foram atualizados.');
    }

    return (
        <div className="p-4 border rounded-lg shadow-md bg-white">
            <h2 className="text-xl font-bold mb-4 flex items-center">
                <Calendar size={20} className="mr-2 text-orange-600"/> 
                Configuração do Calendário Letivo
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Datas Início/Fim */}
                <div>
                    <h3 className="font-semibold text-lg mb-3">Período Letivo Principal</h3>
                    <div className="space-y-3">
                        <label className="block">
                            <span className="text-sm font-medium text-gray-600">Início do Ano Letivo</span>
                            <input 
                                type="date" 
                                value={tempConfig.start}
                                onChange={(e) => setTempConfig({...tempConfig, start: e.target.value})}
                                className="mt-1 p-2 border rounded w-full bg-gray-50"
                            />
                        </label>
                        <label className="block">
                            <span className="text-sm font-medium text-gray-600">Fim do Ano Letivo</span>
                            <input 
                                type="date" 
                                value={tempConfig.end}
                                onChange={(e) => setTempConfig({...tempConfig, end: e.target.value})}
                                className="mt-1 p-2 border rounded w-full bg-gray-50"
                            />
                        </label>
                    </div>
                    
                    <RecessoEditor 
                        recessos={tempConfig.recesses} 
                        setRecessos={(newRecessos) => setTempConfig({...tempConfig, recesses: newRecessos})}
                    />
                </div>

                {/* Feriados/Dias Não Letivos */}
                <div>
                    <h3 className="font-semibold text-lg mb-3">Feriados e Dias Pontuais Sem Aula</h3>
                    <div className="max-h-64 overflow-y-auto p-3 border rounded-lg bg-gray-50">
                        {tempConfig.holidays.length === 0 && <p className="text-gray-500 italic text-sm">Nenhum feriado cadastrado. Clique para adicionar.</p>}
                        {tempConfig.holidays.map((dateString, index) => (
                            <div key={index} className="flex justify-between items-center bg-white p-2 my-1 rounded shadow-sm border">
                                <span>
                                    {formatNativeDate(new Date(dateString), 'DD/MM/YYYY')} 
                                    <span className="text-xs text-red-500 ml-2">({formatNativeDate(new Date(dateString), 'dddd')})</span>
                                </span>
                                <button onClick={() => handleHolidayToggle(dateString)} className="text-red-500 hover:text-red-700 p-1">
                                    <X size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                    
                    <div className="mt-4">
                        <h5 className="text-sm font-medium mb-1">Adicionar Feriado (Data)</h5>
                        <input 
                            type="date" 
                            onChange={(e) => handleHolidayToggle(e.target.value)}
                            className="p-2 border rounded w-full text-sm"
                            title="Adicionar Novo Feriado"
                        />
                    </div>
                </div>
            </div>

            <div className="mt-6 pt-4 border-t flex justify-between items-center">
                <div className="text-md font-semibold text-gray-700">
                    Semanas Letivas Ativas (Total): <span className="text-blue-600 text-xl">{totalSemanasLetivas}</span>
                </div>
                <button onClick={handleSave} className="flex items-center bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 transition">
                    <Save size={20} className="mr-2" /> 
                    Salvar Configuração de Calendário
                </button>
            </div>
        </div>
    );
};

const CadastroProfessores = () => {
    const { professors } = useContext(ScheduleContext);
    
    return (
        <div>
            <ProfessorForm />
            
            <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-3">Lista de Professores ({professors.length} Cadastrados)</h2>
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left">Nome</th>
                            <th className="px-4 py-2 text-center">Matrícula</th>
                            <th className="px-4 py-2 text-center">Regime</th>
                            <th className="px-4 py-2 text-left">Restrição PRD/PGD</th>
                            <th className="px-4 py-2 text-left">Bloqueio Fino</th>
                            <th className="px-4 py-2 text-center w-20"><Edit size={16} /></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {professors.map(p => (
                            <tr key={p.id}>
                                <td className="px-4 py-2 font-medium">{p.name}</td>
                                <td className="px-4 py-2 text-center">{p.matricula}</td>
                                <td className="px-4 py-2 text-center">{p.regime}</td>
                                <td className="px-4 py-2">{p.prdpgd ? `${DAYS[p.prdpgd.day]} ${p.prdpgd.shift}` : 'N/A'}</td>
                                <td className="px-4 py-2">{p.block_fino ? `${DAYS[p.block_fino.day]} ${p.block_fino.slot + 1}ª Aula` : 'N/A'}</td>
                                 <td className="px-4 py-2 text-center"><button className='text-blue-500 hover:text-blue-700'><Edit size={16}/></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const CadastroDisciplinas = () => {
    const { disciplines, profMap, professors } = useContext(ScheduleContext);
    
    return (
        <div>
            <DisciplineForm />
            
            <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-3">Lista de Disciplinas ({disciplines.length} Cadastradas)</h2>
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-4 py-2 text-left">Disciplina (ID)</th>
                            <th className="px-4 py-2 text-left">Turma</th>
                            <th className="px-4 py-2 text-center">CH Anual (Aulas)</th>
                            <th className="px-4 py-2 text-left">Professor</th>
                            <th className="px-4 py-2 text-left">Sala Fixa</th>
                            <th className="px-4 py-2 text-center w-20"><Edit size={16} /></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {disciplines.map(d => (
                            <tr key={d.id}>
                                <td className="px-4 py-2 font-medium">{d.disc} ({d.id})</td>
                                <td className="px-4 py-2">{d.turma}</td>
                                <td className="px-4 py-2 text-center">{d.ch_anual}</td>
                                <td className="px-4 py-2">{profMap[d.profId]?.name || `ID: ${d.profId} (Não Encontrado)`}</td>
                                <td className="px-4 py-2">{d.sala_fixa}</td>
                                <td className="px-4 py-2 text-center"><button className='text-blue-500 hover:text-blue-700'><Edit size={16}/></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <p className='text-xs text-gray-500 mt-2 italic'>Nota: Novos cadastros de disciplinas podem causar um pequeno atraso na atualização do Horário Base (Aba 3).</p>
            </div>
        </div>
    );
};

// 1 - Cadastros (Geral)
const CadastrosPage = () => {
    const { calendarConfig, setCalendarConfig } = useContext(ScheduleContext);
    const [subTab, setSubTab] = useState('Calendario'); 

    const renderSubContent = () => {
        switch (subTab) {
            case 'Calendario':
                return <CalendarioPage calendarConfig={calendarConfig} setCalendarConfig={setCalendarConfig} />;
            case 'Professores':
                return <CadastroProfessores />;
            case 'Disciplinas':
                return <CadastroDisciplinas />;
            default:
                return <CalendarioPage calendarConfig={calendarConfig} setCalendarConfig={setCalendarConfig} />;
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">1 - Cadastros e Configuração Inicial</h1>
            
            <div className="flex space-x-2 mb-6 border-b pb-2">
                <TabButton icon={<Calendar size={18}/>} label="Calendário Letivo" active={subTab === 'Calendario'} onClick={() => setSubTab('Calendario')} />
                <TabButton icon={<Users size={18}/>} label="Professores" active={subTab === 'Professores'} onClick={() => setSubTab('Professores')} />
                <TabButton icon={<Book size={18}/>} label="Disciplinas" active={subTab === 'Disciplinas'} onClick={() => setSubTab('Disciplinas')} />
            </div>

            {renderSubContent()}
        </div>
    );
};

const TabButton = ({ icon, label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center space-x-2 px-4 py-2 rounded-t-lg transition duration-200 text-sm font-medium
            ${active ? 'bg-white border-b-2 border-blue-600 text-blue-600 shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
    >
        {icon}
        <span>{label}</span>
    </button>
);


// --- COMPONENTE MAIN APP ---
const App = () => {
    // Mantém a aba Cadastros como inicial
    const [activeTab, setActiveTab] = useState('Cadastros'); 

    const renderContent = () => {
        switch (activeTab) {
            case 'Cadastros': return <CadastrosPage />;
            case 'Relatorios': return <RelatoriosPage />;
            case 'HorarioBase': return <HorarioBasePage />;
            case 'HorariosSemanais': return <HorariosSemanaisPage />;
            default: return <CadastrosPage />;
        }
    };

    return (
        <ScheduleProvider>
            <div className="min-h-screen flex flex-col font-sans bg-gray-100">
                <Header />
                <div className="flex flex-1 overflow-hidden">
                    <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
                    <main className="flex-1 p-6 overflow-y-auto">
                        {renderContent()}
                    </main>
                </div>
            </div>
        </ScheduleProvider>
    );
};

export default App;
