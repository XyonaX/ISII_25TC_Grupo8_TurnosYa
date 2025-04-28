import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQSection {
    title: string;
    items: FAQItem[];
}

const PreguntasFrecuentes: React.FC = () => {
    const [activeAccordion, setActiveAccordion] = useState<{sectionIndex: number, itemIndex: number} | null>(null);

    const toggleAccordion = (sectionIndex: number, itemIndex: number) => {
        const newValue = activeAccordion?.sectionIndex === sectionIndex && activeAccordion?.itemIndex === itemIndex 
            ? null 
            : {sectionIndex, itemIndex};
        setActiveAccordion(newValue);
    };

    const faqSections: FAQSection[] = [
        {
            title: "Para Pacientes",
            items: [
                {
                    question: "¿Cómo reservo un turno?",
                    answer: "Para reservar un turno: 1) Buscá al profesional de tu preferencia, 2) Seleccioná fecha y horario disponible y 3) Realizá el pago de la consulta. El turno quedará confirmado una vez acreditado el pago. Recibirás un email de confirmación con todos los detalles."
                },
                {
                    question: "¿Tiene algún costo usar TurnosYa?",
                    answer: "Para pacientes: El uso de la plataforma es totalmente gratuito. Solo deberás abonar el costo de la consulta médica según la tarifa del profesional."
                },
                {
                    question: "¿Qué métodos de pago aceptan?",
                    answer: "Aceptamos todos los medios de pago digitales más usados en Argentina: Mercado Pago, tarjetas de crédito/débito (Visa, Mastercard, Amex), transferencias bancarias, y pagos en efectivo a través de Pago Fácil o RapiPago. El profesional puede seleccionar qué métodos acepta para sus consultas."
                },
                {
                    question: "¿Puedo cancelar o reprogramar un turno?",
                    answer: "Sí. Podés cancelar o reprogramar un turno desde tu panel de usuario. Recordá hacerlo con al menos 24 horas de anticipación para evitar cargos adicionales, según las políticas del profesional."
                },
                {
                    question: "¿Qué pasa si no asisto a un turno reservado?",
                    answer: "Si no asistís a un turno sin cancelarlo previamente, el profesional podrá aplicar cargos por inasistencia según sus políticas. Recomendamos cancelar con anticipación."
                },
                {
                    question: "¿Cómo protegen mis datos personales?",
                    answer: "La protección de tus datos es nuestra prioridad. Implementamos medidas de seguridad conforme a la Ley 25.326 de Protección de Datos Personales. Podés conocer más en nuestra Política de Privacidad."
                }
            ]
        },
        {
            title: "Para Profesionales",
            items: [
                {
                    question: "¿Cómo funciona TurnosYa para profesionales?",
                    answer: "TurnosYa te ofrece: 1) Perfil profesional verificable, 2) Agenda inteligente con gestión automática de turnos, 3) Sistema de recordatorios para pacientes y 4) Pasarela de pagos integrada. La plataforma aplica una comisión del X% por turno gestionado (sin costos fijos). Podés registrarte como profesional en nuestra sección exclusiva."
                },
                {
                    question: "¿Qué beneficios obtengo como profesional?",
                    answer: `Como profesional en TurnosYa accedes a:
                    - Panel de gestión completo con historial de pacientes
                    - Personalización de tu perfil con especialidades, horarios y valores
                    - Notificaciones automáticas por WhatsApp/email
                    - Integración con tu calendario existente
                    - Soporte técnico dedicado
                    
                    Costos: Comisión competitiva por turno efectivamente concretado.`
                },
                {
                    question: "¿Cómo verifican a los profesionales?",
                    answer: "Todos los profesionales deben validar su matrícula habilitante ante el colegio o entidad correspondiente, y aprobar nuestro proceso de verificación de identidad. Los pacientes pueden visualizar el estado de verificación en cada perfil profesional."
                }
            ]
        }
    ];

    return (
        <div className="container py-5" style={{ minHeight: 'calc(100vh - 245px)' }}>
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card shadow border-0" style={{ borderRadius: '15px', border: '2px solid #04a658' }}>
                        <div className="card-body p-4 p-md-5">
                            <h1 className="text-center mb-4" style={{ fontFamily: "'Trebuchet MS', sans-serif" }}>
                                <span style={{ color: '#ae5bbf' }}>Preguntas</span>
                                <span style={{ color: '#04a658' }}> Frecuentes</span>
                            </h1>

                            {faqSections.map((section, sectionIndex) => (
                                <div key={sectionIndex} className="mb-5">
                                    <h2 className="mb-3" style={{ 
                                        color: sectionIndex === 0 ? '#ae5bbf' : '#04a658',
                                        fontFamily: "'Trebuchet MS', sans-serif"
                                    }}>
                                        {section.title}
                                    </h2>
                                    
                                    <div className="accordion">
                                        {section.items.map((faq, itemIndex) => (
                                            <div className="accordion-item" key={itemIndex}>
                                                <h3 className="accordion-header">
                                                    <button 
                                                        className={`accordion-button ${activeAccordion?.sectionIndex === sectionIndex && activeAccordion?.itemIndex === itemIndex ? '' : 'collapsed'}`} 
                                                        type="button" 
                                                        onClick={() => toggleAccordion(sectionIndex, itemIndex)}
                                                        aria-expanded={activeAccordion?.sectionIndex === sectionIndex && activeAccordion?.itemIndex === itemIndex}
                                                    >
                                                        {faq.question}
                                                    </button>
                                                </h3>
                                                <div 
                                                    id={`collapse-${sectionIndex}-${itemIndex}`} 
                                                    className={`accordion-collapse collapse ${activeAccordion?.sectionIndex === sectionIndex && activeAccordion?.itemIndex === itemIndex ? 'show' : ''}`}
                                                >
                                                    <div className="accordion-body" style={{ textAlign: 'justify', color: '#555' }}>
                                                        {faq.answer}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            <div className="text-center mt-5">
                                <Link to="/" className="btn" style={{ 
                                    backgroundColor: '#04a658', 
                                    color: 'white',
                                    borderRadius: '8px',
                                    padding: '10px 25px'
                                }}>
                                    Volver al Inicio
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreguntasFrecuentes;