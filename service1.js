export const getDocInfo = (doctorId, hospitalId, doctorProfession) => {
    const hospital = await fetch(`/api/hospitals/${hospitalId}`);
    let doctor;
    hospital.doctors.forEach(doc => {
        if (doc.isWorking == true) {
            if (doc.id == doctorId) {
                doctor = doc;
            }
        }
    })
    doctorProfession = doctorProfession || doctor.profession;
    let data;
    switch (true) {
        case doctorProfession == 'dentist':
            data = {
                name: doctor.name,
                profession: doctorProfession,
                qualification: doctor.qualification,
                certificate: doctor.certificate,
                specificSkills: [],
            };
            Object.keys(doctor.skills).forEach(s => {
                if (doctor.skills[s]) {
                    if (s === 'extraction') {
                        data.specificSkills.push('Extraction')
                    } else if (s === 'prosthesis') {
                        data.specificSkills.push('Prosthesis');
                    } else if (s === 'filling') {
                        data.specificSkills.push('Filling');
                    }
                }
            });
            break;
        case doctorProfession == 'therapist':
            data = {
                name: doctor.name,
                profession: doctorProfession,
                qualification: doctor.qualification,
            };
    }
    return data;
}