window.addEventListener('DOMContentLoaded', (e) => {

    !async function(){
        const studentListTag = document.querySelector(".s-list")
        const averagePourcentageTag = document.querySelector('.pourcentage-average')
        const searchField = document.querySelector('#searchInput')

        const filterAllTag = document.querySelector('#filterAll')
        const filterLadiesTag = document.querySelector('#filterLadies')
        const filterMenTag = document.querySelector('#filterMen')
        const filterFASATag = document.querySelector('#filterFASA')
        const filterFASICTag = document.querySelector('#filterFASIC')
        const filterFATHEOTag = document.querySelector('#filterFATHEO')
        const filterFASEGTag = document.querySelector('#filterFASEG')
        const filterDROITTag = document.querySelector('#filterDROIT')


        // get students list from the backend API
        const students = await fetch('http://192.168.43.22:8000/student/api/students')
            .then(response => response.json())
            .then(data => data)
            .catch(err => console.error(err))

        // get attendancies from the API
        const attendances = await fetch('http://192.168.43.22:8000/attendance/api/attendances')
            .then(response => response.json())
            .then(data => data)
            .catch(err => console.error(err))

        // get number of activities
        let activities = []
        attendances.forEach(att => activities = [...activities, att.date])

        const activitiesSet = new Set(activities)
        const nbrActivities = activitiesSet.size

        let averagePourcentage = 0

        // insert students in the DOM
        insertStudentsInTheDOM(students)

        // search and filter student
        searchField.addEventListener('keyup', e => searchStudent(e.target.value))
        filterAllTag.addEventListener('click', e => {
            studentListTag.innerHTML = ''
            insertStudentsInTheDOM(students)
        })
        filterLadiesTag.addEventListener('click', e => {
            studentListTag.innerHTML = ''
            insertStudentsInTheDOM(students.filter(st => st.gender == 'F'))
        })

        filterMenTag.addEventListener('click', e => {
            studentListTag.innerHTML = ''
            insertStudentsInTheDOM(students.filter(st => st.gender == 'M'))
        })

        filterFASATag.addEventListener('click', e => {
            studentListTag.innerHTML = ''
            insertStudentsInTheDOM(students.filter(st => st.faculty == 'FASA'))
        })

        filterFASICTag.addEventListener('click', e => {
            studentListTag.innerHTML = ''
            insertStudentsInTheDOM(students.filter(st => st.faculty == 'FASIC'))
        })

        filterFATHEOTag.addEventListener('click', e => {
            studentListTag.innerHTML = ''
            insertStudentsInTheDOM(students.filter(st => st.faculty == 'FATHEO'))
        })

        filterFASEGTag.addEventListener('click', e => {
            studentListTag.innerHTML = ''
            insertStudentsInTheDOM(students.filter(st => st.faculty == 'FASEG'))
        })

        filterDROITTag.addEventListener('click', e => {
            studentListTag.innerHTML = ''
            insertStudentsInTheDOM(students.filter(st => st.faculty == 'DROIT'))
        })
        // end filters

        averagePourcentage /= students.length
        averagePourcentageTag.innerHTML = `
            <span>${averagePourcentage} % </span>
            <br>
            <span> Participation Moyenne </span>
        `

        /*
         * UTILS FUNCTIONS
         */

        // search student
        function searchStudent(keyWord) {
             // clear the students DOM list first
            studentListTag.innerHTML = ''

            // filter students
            let sts = students.filter(studentFiltered => studentFiltered.fullname.toLowerCase().includes(keyWord.toLowerCase())
                || studentFiltered.matricule.includes(keyWord)
                || studentFiltered.rf_id.includes(keyWord))

            insertStudentsInTheDOM(sts)
        }

        // insert students in the DOM
        function insertStudentsInTheDOM (studentsList) {
            studentsList.forEach(student => {
                let name = student.fullname
                let matricule = student.matricule
                let faculty = student.faculty
                let gender = student.gender

                let studentTag = document.createElement('tr')
                let matriculeTag = document.createElement('td')
                let pourcentageTag = document.createElement('td')
                let nameTag = document.createElement('td')
                let facultyTag = document.createElement('td')
                let genderTag = document.createElement('td')

                nameTag.innerHTML = name
                matriculeTag.innerHTML = matricule
                facultyTag.innerHTML = faculty
                genderTag.innerHTML = gender

                // calculate the pourcentage
                let nbrAttendances = attendances.filter(attendance => attendance.rf_id === student.rf_id)
                let pourcentage = (nbrAttendances.length / nbrActivities) * 100
                pourcentageTag.innerHTML = `${pourcentage} %`

                averagePourcentage += pourcentage

                studentTag.appendChild(nameTag)
                studentTag.appendChild(genderTag)
                studentTag.appendChild(matriculeTag)
                studentTag.appendChild(facultyTag)
                studentTag.appendChild(pourcentageTag)

                studentListTag.appendChild(studentTag)
            })
        }

    }()

})