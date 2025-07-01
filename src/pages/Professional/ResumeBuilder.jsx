import React, { useState } from 'react';
import {
  TextField, Button, Typography, Box, Grid, Card, CardContent
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ResumeForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    role: '',
    linkendProfileLink: '',
    githubProfileLink: '',
    university: '',
    start: '',
    end: '',
    location: '',
    skills: [''],
    experiences: [{ name: '', description: '', duration: '' }],
    achievements: [{ title: '', description: '' }],
    projects: [{ name: '', description: '', github: '' }],
    certifications: [{ name: '', organization: '', url: '' }]
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSkillChange = (e, idx) => {
    const newSkills = [...form.skills];
    newSkills[idx] = e.target.value;
    setForm({ ...form, skills: newSkills });
  };

  const handleSectionChange = (e, idx, key, section) => {
    const updated = [...form[section]];
    updated[idx][key] = e.target.value;
    setForm({ ...form, [section]: updated });
  };

  const addSectionEntry = (section, entry) => {
    setForm({ ...form, [section]: [...form[section], entry] });
  };

  const addSkill = () => {
    setForm({ ...form, skills: [...form.skills, ''] });
  };

  const clearForm = () => {
    setForm({
      name: '',
      phone: '',
      email: '',
      role: '',
      linkendProfileLink: '',
      githubProfileLink: '',
      university: '',
      start: '',
      end: '',
      location: '',
      skills: [''],
      experiences: [{ name: '', description: '', duration: '' }],
      achievements: [{ title: '', description: '' }],
      projects: [{ name: '', description: '', github: '' }],
      certifications: [{ name: '', organization: '', url: '' }]
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/preview', {
      state: { afterFillUpForm: form }
    });
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3 }}>
      <Typography variant="h4" gutterBottom>Resume Builder</Typography>
      <form onSubmit={handleSubmit}>

        {/* 🔹 Personal Info */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6">Personal Info</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField name="name" label="Name" fullWidth value={form.name} onChange={handleChange} required />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField name="phone" label="Phone" fullWidth value={form.phone} onChange={handleChange} required />
              </Grid>
              <Grid item xs={12}>
                <TextField name="email" label="Email" fullWidth value={form.email} onChange={handleChange} required />
              </Grid>
              <Grid item xs={12}>
                <TextField name="role" label="Job Role" fullWidth value={form.role} onChange={handleChange} required />
              </Grid>
              <Grid item xs={12}>
                <TextField name="linkendProfileLink" label="LinkedIn Profile Link" fullWidth value={form.linkendProfileLink} onChange={handleChange} />
              </Grid>
              <Grid item xs={12}>
                <TextField name="githubProfileLink" label="GitHub Profile Link" fullWidth value={form.githubProfileLink} onChange={handleChange} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* 🔹 Education */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6">Education</Typography>
            <TextField name="university" label="University" fullWidth value={form.university} onChange={handleChange} sx={{ mb: 2 }} />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField name="start" label="Start Year" fullWidth value={form.start} onChange={handleChange} />
              </Grid>
              <Grid item xs={6}>
                <TextField name="end" label="End Year" fullWidth value={form.end} onChange={handleChange} />
              </Grid>
            </Grid>
            <TextField name="location" label="Location" fullWidth value={form.location} onChange={handleChange} sx={{ mt: 2 }} />
          </CardContent>
        </Card>

        {/* 🔹 Experience */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6">Experience</Typography>
            {form.experiences.map((exp, idx) => (
              <Box key={idx} sx={{ mb: 3 }}>
                <TextField label="Company" fullWidth value={exp.name} onChange={(e) => handleSectionChange(e, idx, 'name', 'experiences')} sx={{ mb: 1 }} />
                <TextField label="Job Title / Role" fullWidth value={exp.description} onChange={(e) => handleSectionChange(e, idx, 'description', 'experiences')} sx={{ mb: 1 }} />
                <TextField label="Duration (Years)" fullWidth value={exp.duration} onChange={(e) => handleSectionChange(e, idx, 'duration', 'experiences')} />
              </Box>
            ))}
            <Button variant="outlined" onClick={() => addSectionEntry('experiences', { name: '', description: '', duration: '' })}>Add Experience</Button>
          </CardContent>
        </Card>
         {/* 🔹 Skills */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6">Skills</Typography>
            {form.skills.map((skill, idx) => (
              <TextField
                key={idx}
                label={`Skill ${idx + 1}`}
                fullWidth
                value={skill}
                onChange={(e) => handleSkillChange(e, idx)}
                sx={{ mb: 2 }}
              />
            ))}
            <Button variant="outlined" onClick={addSkill}>Add Skill</Button>
          </CardContent>
        </Card>

        {/* 🔹 Achievements */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6">Achievements</Typography>
            {form.achievements.map((ach, idx) => (
              <Box key={idx} sx={{ mb: 3 }}>
                <TextField label="Title / Award Name" fullWidth value={ach.title} onChange={(e) => handleSectionChange(e, idx, 'title', 'achievements')} sx={{ mb: 1 }} />
                <TextField label="Description" fullWidth multiline rows={2} value={ach.description} onChange={(e) => handleSectionChange(e, idx, 'description', 'achievements')} />
              </Box>
            ))}
            <Button variant="outlined" onClick={() => addSectionEntry('achievements', { title: '', description: '' })}>Add Achievement</Button>
          </CardContent>
        </Card>

        {/* 🔹 Projects */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6">Projects</Typography>
            {form.projects.map((proj, idx) => (
              <Box key={idx} sx={{ mb: 3 }}>
                <TextField label="Project Name" fullWidth value={proj.name} onChange={(e) => handleSectionChange(e, idx, 'name', 'projects')} sx={{ mb: 1 }} />
                <TextField label="Description" fullWidth multiline rows={2} value={proj.description} onChange={(e) => handleSectionChange(e, idx, 'description', 'projects')} sx={{ mb: 1 }} />
                <TextField label="GitHub Link" fullWidth value={proj.github} onChange={(e) => handleSectionChange(e, idx, 'github', 'projects')} />
              </Box>
            ))}
            <Button variant="outlined" onClick={() => addSectionEntry('projects', { name: '', description: '', github: '' })}>Add Project</Button>
          </CardContent>
        </Card>

        {/* 🔹 Certifications */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6">Certifications</Typography>
            {form.certifications.map((cert, idx) => (
              <Box key={idx} sx={{ mb: 3 }}>
                <TextField label="Certification Name" fullWidth value={cert.name} onChange={(e) => handleSectionChange(e, idx, 'name', 'certifications')} sx={{ mb: 1 }} />
                <TextField label="Issuing Organization" fullWidth value={cert.organization} onChange={(e) => handleSectionChange(e, idx, 'organization', 'certifications')} sx={{ mb: 1 }} />
                <TextField label="Certificate URL (Optional)" fullWidth value={cert.url} onChange={(e) => handleSectionChange(e, idx, 'url', 'certifications')} />
              </Box>
            ))}
            <Button variant="outlined" onClick={() => addSectionEntry('certifications', { name: '', organization: '', url: '' })}>Add Certification</Button>
          </CardContent>
        </Card>

       

        {/* 🔹 Submit */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="outlined" onClick={clearForm}>Clear</Button>
          <Button type="submit" variant="contained" color="primary">Preview & Download</Button>
        </Box>
      </form>
    </Box>
  );
};

export default ResumeForm;
