import React, { useState } from 'react';

interface IntroFormProps {
    onComplete: (formData: any) => void;
}

const expertiseOptions = [
    'Orthopaedic specialist',
    'Orthopaedic resident',
    'Radiology specialist',
    'Radiology resident',
    'Medical Student - with measurements cross checked by specialist',
];

const countryOptions = [
    '', // Placeholder
    'Singapore',
    'United States',
    'United Kingdom',
    'Australia',
    'India',
    'Other',
];

const IntroForm: React.FC<IntroFormProps> = ({ onComplete }) => {
    const [form, setForm] = useState({
        lastName: '',
        firstName: '',
        institution: '',
        country: '',
        email: '',
        expertise: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onComplete(form);
    };

    return (
        <div style={{ maxWidth: 700, margin: '40px auto', background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.07)', padding: 40 }}>
            <h2 style={{ color: '#4B6ED6', fontSize: 32, marginBottom: 10 }}>Information about Collaborator</h2>
            <div style={{ background: '#f7f9fc', borderRadius: 8, padding: '24px 24px 18px 24px', marginBottom: 32, color: '#333', fontSize: 17, lineHeight: 1.7 }}>
                Dear collaborator,<br /><br />
                Thank you for agreeing to collaborate in this study together.<br /><br />
                The primary aim of this study is to analyse the development of the anterior cruciate ligament in children using magnetic resonance imaging (MRI). The secondary aim of the study is to compare the parameters between patients with anterior cruciate ligament injury and those without. The tertiary aim of the study is to analyse the development of the anterior cruciate ligament graft following anterior cruciate ligament reconstruction.<br /><br />
                We would be grateful if you could fill up the fields below for data collection. The inclusion and exclusion criteria of the patients are also found in the fields below. Please fill up one form for each patient/MRI.<br /><br />
                If you have any questions, please do not hesitate to contact Dr Sharon Tan at sharon_sh_tan@nuhs.edu.sg.<br /><br />
                Thank you very much once again!
            </div>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 32 }}>
                    <label style={{ fontWeight: 600, fontSize: 18, display: 'block', marginBottom: 6 }}>
                        1. Last name of collaborator
                        <div style={{ fontWeight: 400, color: '#888', fontSize: 15, marginBottom: 8 }}>
                            Please indicate your name as you would like it to appear for publication subsequently
                        </div>
                        <input
                            type="text"
                            name="lastName"
                            value={form.lastName}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', fontSize: 18, padding: '16px 14px', borderRadius: 8, border: '1px solid #ccc', marginTop: 2 }}
                        />
                    </label>
                </div>
                <div style={{ marginBottom: 32 }}>
                    <label style={{ fontWeight: 600, fontSize: 18, display: 'block', marginBottom: 6 }}>
                        2. First name of collaborator
                        <div style={{ fontWeight: 400, color: '#888', fontSize: 15, marginBottom: 8 }}>
                            Please indicate your name as you would like it to appear for publication subsequently
                        </div>
                        <input
                            type="text"
                            name="firstName"
                            value={form.firstName}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', fontSize: 18, padding: '16px 14px', borderRadius: 8, border: '1px solid #ccc', marginTop: 2 }}
                        />
                    </label>
                </div>
                <div style={{ marginBottom: 32 }}>
                    <label style={{ fontWeight: 600, fontSize: 18, display: 'block', marginBottom: 6 }}>
                        3. Institution of collaborator
                        <div style={{ fontWeight: 400, color: '#888', fontSize: 15, marginBottom: 8 }}>
                            Please indicate your institution as you would like it to appear for publication subsequently
                        </div>
                        <input
                            type="text"
                            name="institution"
                            value={form.institution}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', fontSize: 18, padding: '16px 14px', borderRadius: 8, border: '1px solid #ccc', marginTop: 2 }}
                        />
                    </label>
                </div>
                <div style={{ marginBottom: 32 }}>
                    <label style={{ fontWeight: 600, fontSize: 18, display: 'block', marginBottom: 6 }}>
                        4. Country/Region of collaborator
                        <div style={{ fontWeight: 400, color: '#888', fontSize: 15, marginBottom: 8 }}>
                            Please select your country or region
                        </div>
                        <select
                            name="country"
                            value={form.country}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', fontSize: 18, padding: '16px 14px', borderRadius: 8, border: '1px solid #ccc', marginTop: 2 }}
                        >
                            <option value="" disabled>Select an option</option>
                            {countryOptions.slice(1).map((country) => (
                                <option key={country} value={country}>{country}</option>
                            ))}
                        </select>
                    </label>
                </div>
                <div style={{ marginBottom: 32 }}>
                    <label style={{ fontWeight: 600, fontSize: 18, display: 'block', marginBottom: 6 }}>
                        5. Email of collaborator
                        <div style={{ fontWeight: 400, color: '#888', fontSize: 15, marginBottom: 8 }}>
                            Please indicate your email address
                        </div>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', fontSize: 18, padding: '16px 14px', borderRadius: 8, border: '1px solid #ccc', marginTop: 2 }}
                        />
                    </label>
                </div>
                <div style={{ marginBottom: 32 }}>
                    <label style={{ fontWeight: 600, fontSize: 18, display: 'block', marginBottom: 6 }}>
                        6. Expertise of person performing data measurements
                        <div style={{ fontWeight: 400, color: '#888', fontSize: 15, marginBottom: 8 }}>
                            Please select your expertise
                        </div>
                        <select
                            name="expertise"
                            value={form.expertise}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', fontSize: 18, padding: '16px 14px', borderRadius: 8, border: '1px solid #ccc', marginTop: 2 }}
                        >
                            <option value="" disabled>Select an option</option>
                            {expertiseOptions.map((option) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </label>
                </div>
                <button type="submit" style={{ background: '#4B6ED6', color: '#fff', fontSize: 20, padding: '14px 36px', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}>
                    Continue
                </button>
            </form>
        </div>
    );
};

export default IntroForm; 