import React, { useRef } from 'react';
import { Button, Box, Typography } from '@mui/material';
import { useReactToPrint } from 'react-to-print';
import { useLocation } from 'react-router';
import html2pdf from 'html2pdf.js';

const ResumePreview = () => {
  const location = useLocation();
  const { afterFillUpForm: data } = location.state || {};
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `${data?.name?.replace(/\s+/g, '_') || 'Resume'}`
  });

  const handleDirectDownload = () => {
    const element = componentRef.current;
    const opt = {
      margin:       0.5,
      filename:     `${data?.name?.replace(/\s+/g, '_') || 'Resume'}.pdf`,
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
  };

  if (!data)
    return (
      <Box sx={{ maxWidth: 700, mx: 'auto', mt: 6, textAlign: 'center', fontSize: 18 }}>
        No resume data found. Please fill out the form first.
      </Box>
    );

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', p: 4 }}>
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Button variant="contained" onClick={handlePrint}>
          Print / Save as PDF
        </Button>
        <Button variant="outlined" onClick={handleDirectDownload}>
          Direct Download as PDF
        </Button>
      </Box>

      <Box
        ref={componentRef}
        sx={{
          fontFamily: 'Georgia, serif',
          backgroundColor: '#fff',
          padding: 4,
          boxShadow: '0 0 15px rgba(0,0,0,0.15)',
          borderRadius: 2,
          userSelect: 'none',
          lineHeight: 1.6
        }}
      >
        {/* Header */}
        <Box sx={{ pb: 1, mb: 2, textAlign: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{data.name}</Typography>
          <Typography variant="body1">{data.role}</Typography>
          <Typography variant="body2" sx={{ color: 'gray' }}>{data.email} | {data.phone}</Typography>
          <Typography variant="body2" sx={{ color: 'gray' }}>{data.linkendProfileLink} | {data.githubProfileLink}</Typography>
        </Box>

        {/* Education */}
        <Section title="Education">
          <Typography variant="h6" sx={{ fontWeight: 600 }}>{data.university}</Typography>
          <Typography>{data.start} - {data.end} | {data.location}</Typography>
        </Section>

        {/* Experience */}
        {data.experiences && data.experiences.some(e => e.name.trim()) && (
          <Section title="Experience">
            {data.experiences.map((exp, i) => exp.name.trim() && (
              <Box key={i} sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{exp.name}</Typography>
                <Typography variant="body2">{exp.description}</Typography>
                <Typography variant="body2" sx={{ color: 'gray' }}>{exp.duration}</Typography>
              </Box>
            ))}
          </Section>
        )}

        {/* Projects */}
        {data.projects && data.projects.some(p => p.name.trim()) && (
          <Section title="Projects">
            {data.projects.map((proj, i) => proj.name.trim() && (
              <Box key={i} sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{proj.name}</Typography>
                <Typography variant="body2">{proj.description}</Typography>
                {proj.github && <a href={proj.github} target="_blank" rel="noreferrer">{proj.github}</a>}
              </Box>
            ))}
          </Section>
        )}

        {/* Skills */}
        {data.skills && data.skills.some(s => s.trim()) && (
          <Section title="Skills">
            <Box sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
              mt: 1
            }}>
              {data.skills.map((skill, i) => skill.trim() && (
                <Box
                  key={i}
                  sx={{
                    bgcolor: '#0d47a1',
                    color: 'white',
                    px: 2,
                    py: 0.5,
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: 500
                  }}
                >
                  {skill}
                </Box>
              ))}
            </Box>
          </Section>
        )}

        {/* Achievements */}
        {data.achievements && data.achievements.some(a => a.title.trim()) && (
          <Section title="Achievements">
            {data.achievements.map((ach, i) => ach.title.trim() && (
              <Box key={i} sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{ach.title}</Typography>
                <Typography variant="body2">{ach.description}</Typography>
              </Box>
            ))}
          </Section>
        )}

        {/* Certifications */}
        {data.certifications && data.certifications.some(c => c.name.trim()) && (
          <Section title="Certifications">
            {data.certifications.map((cert, i) => cert.name.trim() && (
              <Box key={i} sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{cert.name}</Typography>
                <Typography variant="body2">{cert.organization}</Typography>
                {cert.url && <a href={cert.url} target="_blank" rel="noreferrer">{cert.url}</a>}
              </Box>
            ))}
          </Section>
        )}
      </Box>
    </Box>
  );
};

const Section = ({ title, children }) => (
  <Box sx={{ mb: 3 }}>
    <Typography variant="h5" sx={{ fontWeight: 'bold', borderBottom: '2px solid #1976d2', mb: 1 }}>{title}</Typography>
    {children}
  </Box>
);

export default ResumePreview;
