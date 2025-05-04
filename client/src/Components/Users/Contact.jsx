import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';

const Contact = () => {
    const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const validate = () => {
        const newErrors = {};
        if (!form.name.trim()) newErrors.name = 'יש להזין שם';
        if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'כתובת מייל לא תקינה';
        if (!form.phone.match(/^0\d{8,9}$/)) newErrors.phone = 'מספר טלפון לא תקין';
        if (!form.message.trim()) newErrors.message = 'נא להזין הודעה';
        return newErrors;
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const res = await fetch("http://localhost:3600/api/emails/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    customerEmail: form.email,
                    adminEmail: 'yambalonb@gmail.com',
                    customerSubject: "פנייתך התקבלה",
                    adminSubject: "פנייה חדשה מצור קשר",
                    customerText: `שלום ${form.name}, תודה על פנייתך! אנו נחזור אליך בהקדם.`,
                    adminText: `פנייה חדשה התקבלה מצור קשר:\nשם: ${form.name}\nמייל: ${form.email}\nטלפון: ${form.phone}\nהודעה: ${form.message}`,
                }),
            });

            if (res.status === 200) {
                setSubmitted(true);
                setForm({ name: '', email: '', phone: '', message: '' });
            } else {
                alert('שליחת ההודעה נכשלה');
            }
        } catch (error) {
            console.error("❌ Error sending email:", error);
        }
    };

    return (
        <Card title="צור קשר" className="p-4 shadow-4 m-auto mt-5" style={{ maxWidth: '500px', direction: 'rtl' }}>
            {submitted && <Message severity="success" text="ההודעה נשלחה בהצלחה!" />}
            <form onSubmit={handleSubmit} className="p-fluid">
                <div className="field">
                    <label htmlFor="name">שם</label>
                    <InputText id="name" name="name" value={form.name} onChange={handleChange} />
                    {errors.name && <small className="p-error">{errors.name}</small>}
                </div>

                <div className="field">
                    <label htmlFor="email">אימייל</label>
                    <InputText id="email" name="email" value={form.email} onChange={handleChange} />
                    {errors.email && <small className="p-error">{errors.email}</small>}
                </div>

                <div className="field">
                    <label htmlFor="phone">טלפון</label>
                    <InputText id="phone" name="phone" value={form.phone} onChange={handleChange} />
                    {errors.phone && <small className="p-error">{errors.phone}</small>}
                </div>

                <div className="field">
                    <label htmlFor="message">הודעה</label>
                    <InputTextarea id="message" name="message" rows={5} value={form.message} onChange={handleChange} />
                    {errors.message && <small className="p-error">{errors.message}</small>}
                </div>

                <Button label="שלח פנייה" icon="pi pi-envelope" className="mt-3" type="submit" />
            </form>
        </Card>
    );
};

export default Contact;
