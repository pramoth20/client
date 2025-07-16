import React, { useState } from 'react';

interface QuizProps {
    quizId: string;
    onComplete: (results: any) => void;
}

// Define the steps and questions for the multi-step form
const steps = [
    {
        title: 'Inclusion/Exclusion Criteria',
        questions: [
            {
                id: 'inclusion_confirm',
                label: 'Please confirm that your patient is 16 years or younger and had a MRI knee done. Otherwise, please exclude the patient.',
                type: 'yesno',
                required: true,
                image: false,
            },
            {
                id: 'exclusion_confirm',
                label: 'Please confirm that your patient does not meet the exclusion criteria (previous fractures, septic arthritis or peri-articular osteomyelitis of the knee, tumours, syndromic conditions, etc.). Otherwise, please exclude the patient.',
                type: 'yesno',
                required: true,
                image: false,
            },
        ],
    },
    {
        title: 'Demographics of the Patient',
        questions: [
            {
                id: 'study_id',
                label: 'Study ID',
                type: 'text',
                required: true,
                image: false,
            },
            {
                id: 'age',
                label: 'Age (in years) when MRI is performed',
                type: 'number',
                required: true,
                image: false,
            },
            {
                id: 'gender',
                label: 'Gender',
                type: 'select',
                options: ['Male', 'Female', 'Other'],
                required: true,
                image: false,
            },
            {
                id: 'mri_date',
                label: 'Date when MRI is performed',
                type: 'date',
                required: true,
                image: false,
            },
        ],
    },
    {
        title: 'Symptomatology of the Patient',
        questions: [
            {
                id: 'mri_indication',
                label: 'Indication for performing MRI',
                type: 'select',
                options: ['ACL injury', 'Other ligamentous injury', 'Meniscal Injuries or pathologies', 'Cartilage injury or pathologies', 'Patellofemoral joint injury', 'Plica', 'Tumour', 'Infection', 'Other'],
                required: true,
                image: false,
            },
            {
                id: 'mri_indication_other',
                label: 'If your patient had other indications (not stated above) for performing MRI, please state here (optional):',
                type: 'text',
                required: false,
                image: false,
            },
            {
                id: 'acl_injury',
                label: 'Does your patient have anterior cruciate ligament injury?',
                type: 'yesno',
                required: true,
                image: false,
            },
            {
                id: 'acl_tear_type',
                label: 'If your patient has anterior cruciate ligament injury, does he/she have a partial or complete tear?',
                type: 'checkbox',
                options: ['Sprain', 'Partial tear', 'Complete tear', 'Not applicable(no ACL injury)'],
                required: true,
                image: false,
            },
            {
                id: 'acl_concomitant_injuries',
                label: 'If your patient has anterior cruciate ligament injury, does he/she have other concomitant injuries identified on MRI? (please tick all that applies)',
                type: 'checkbox',
                options: ['Yes, concomitant posterior cruciate ligament injury', 'Yes, concomitant meniscal injury', 'Yes, concomitant cartilage injury', 'Yes, concomitant collateral ligament injury', 'Yes, concomitant pcl injury', 'No, no ACL injuries'],
                required: true,
                image: false,
            },
        ],
    },
    {
        title: 'Anterior Cruciate Ligament Reconstruction',
        questions: [
            {
                id: 'acl_reconstruction',
                label: 'Did your patient have an anterior cruciate ligament reconstruction done?',
                type: 'yesno',
                required: true,
                image: false,
            },
            {
                id: 'acl_recon_date',
                label: 'If your patient had an anterior cruciate ligament reconstruction done, when was the date of the reconstruction? (optional)',
                type: 'date',
                required: false,
                image: false,
            },
            {
                id: 'mri_before_after_recon',
                label: 'If your patient had an anterior cruciate ligament reconstruction done, is this MRI done before or after the reconstruction?',
                type: 'select',
                options: ['Before', 'After'],
                required: false,
                image: false,
            },
            {
                id: 'femoral_graft_diameter',
                label: 'If your patient had an anterior cruciate ligament reconstruction done, what was the femoral diameter of the graft? (optional)',
                type: 'number',
                required: false,
                image: false,
            },
            {
                id: 'tibial_graft_diameter',
                label: 'If your patient had an anterior cruciate ligament reconstruction done, what was the tibial diameter of the graft? (optional)',
                type: 'number',
                required: false,
                image: false,
            },
        ],
    },
    {
        title: 'MRI Parameters of the Patient',
        questions: [
            {
                id: 'femoral_notch_shape',
                label: 'Femoral notch shape (see image)',
                type: 'select',
                options: ['Type 1', 'Type 2', 'Type 3'], // Placeholder options
                required: true,
                image: true,
            },
            {
                id: 'femoral_notch_height',
                label: 'Femoral notch height (in mm)',
                type: 'number',
                required: true,
                image: false,
            },
            // ... (add all other MRI parameter questions here, using type: 'number', 'select', etc., and image: true where needed)
        ],
    },
    {
        title: 'Completion of Data Collection',
        questions: [
            {
                id: 'data_collection_complete',
                label: 'Have you completed all the data collection for your institution?',
                type: 'yesno',
                required: true,
                image: false,
            },
        ],
    },
];

const Quiz: React.FC<QuizProps> = ({ quizId, onComplete }) => {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<any>({});

    const currentStep = steps[step];

    const handleChange = (id: string, value: any) => {
        setAnswers({ ...answers, [id]: value });
    };

    const handleNext = () => {
        setStep((prev) => prev + 1);
    };

    const handleBack = () => {
        setStep((prev) => prev - 1);
    };

    const handleSubmit = () => {
        onComplete({ quizId, answers });
    };

    return (
        <div className="quiz-multistep" style={{ maxWidth: 700, margin: '40px auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', padding: 40 }}>
            <h2 style={{ color: '#4B6ED6', fontSize: 28, marginBottom: 20 }}>{currentStep.title}</h2>
            <form onSubmit={e => { e.preventDefault(); step === steps.length - 1 ? handleSubmit() : handleNext(); }}>
                {currentStep.questions.map((q) => (
                    <div key={q.id} style={{ marginBottom: 28 }}>
                        <label style={{ fontWeight: 600, fontSize: 17, display: 'block', marginBottom: 6 }}>
                            {q.label}
                            {q.image && <div style={{ margin: '10px 0', background: '#f0f0f0', height: 120, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>[Image Placeholder]</div>}
                            {q.type === 'text' && (
                                <input type="text" value={answers[q.id] || ''} onChange={e => handleChange(q.id, e.target.value)} required={q.required} style={{ width: '100%', fontSize: 16, padding: '12px 10px', borderRadius: 8, border: '1px solid #ccc', marginTop: 2 }} />
                            )}
                            {q.type === 'number' && (
                                <input type="number" value={answers[q.id] || ''} onChange={e => handleChange(q.id, e.target.value)} required={q.required} style={{ width: '100%', fontSize: 16, padding: '12px 10px', borderRadius: 8, border: '1px solid #ccc', marginTop: 2 }} />
                            )}
                            {q.type === 'date' && (
                                <input type="date" value={answers[q.id] || ''} onChange={e => handleChange(q.id, e.target.value)} required={q.required} style={{ width: '100%', fontSize: 16, padding: '12px 10px', borderRadius: 8, border: '1px solid #ccc', marginTop: 2 }} />
                            )}
                            {q.type === 'select' && (
                                <select value={answers[q.id] || ''} onChange={e => handleChange(q.id, e.target.value)} required={q.required} style={{ width: '100%', fontSize: 16, padding: '12px 10px', borderRadius: 8, border: '1px solid #ccc', marginTop: 2 }}>
                                    <option value="" disabled>Select an option</option>
                                    {q.options && q.options.map((opt: string) => (
                                        <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                </select>
                            )}
                            {q.type === 'yesno' && (
                                <div style={{ marginTop: 8 }}>
                                    <label style={{ marginRight: 18 }}><input type="radio" name={q.id} value="yes" checked={answers[q.id] === 'yes'} onChange={() => handleChange(q.id, 'yes')} required={q.required} /> Yes</label>
                                    <label><input type="radio" name={q.id} value="no" checked={answers[q.id] === 'no'} onChange={() => handleChange(q.id, 'no')} required={q.required} /> No</label>
                                </div>
                            )}
                            {q.type === 'checkbox' && q.options && (
                                <div style={{ marginTop: 8 }}>
                                    {q.options.map((opt: string) => (
                                        <label key={opt} style={{ marginRight: 18 }}>
                                            <input
                                                type="checkbox"
                                                checked={Array.isArray(answers[q.id]) && answers[q.id].includes(opt)}
                                                onChange={e => {
                                                    const arr = Array.isArray(answers[q.id]) ? answers[q.id] : [];
                                                    if (e.target.checked) handleChange(q.id, [...arr, opt]);
                                                    else handleChange(q.id, arr.filter((v: string) => v !== opt));
                                                }}
                                            /> {opt}
                                        </label>
                                    ))}
                                </div>
                            )}
                        </label>
                    </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 30 }}>
                    {step > 0 && <button type="button" onClick={handleBack} style={{ padding: '10px 28px', borderRadius: 8, border: 'none', background: '#eee', color: '#333', fontSize: 16, fontWeight: 600 }}>Back</button>}
                    <button type="submit" style={{ background: '#4B6ED6', color: '#fff', fontSize: 18, padding: '12px 36px', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>
                        {step === steps.length - 1 ? 'Submit' : 'Next'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Quiz; 