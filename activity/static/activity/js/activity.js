window.addEventListener('DOMContentLoaded', (e) => {

    !async function(){
        const studentListTag = document.querySelector(".s-list")
        const averagePourcentageTag = document.querySelector('.pourcentage-average')
        const searchField = document.querySelector('#searchInput')

       
        // get students list from the backend API
        const students = await fetch('student/api/students')
            .then(response => response.json())
            .then(data => data)
            .catch(err => console.error(err))
        
        // get attendancies from the API
        const attendances = await fetch('attendance/api/attendances')
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

        // search student
        searchField.addEventListener('keyup', e => {
            // clear the students DOM list first
            studentListTag.innerHTML = ''

            let keyWord = e.target.value

            // filter students
            let sts = students.filter(studentFiltered => studentFiltered.fullname.toLowerCase().includes(keyWord.toLowerCase()) || studentFiltered.matricule.includes(keyWord))
            insertStudentsInTheDOM(sts)

            console.log(sts)
        })

        averagePourcentage /= students.length
        averagePourcentageTag.innerHTML = `
            <span>${averagePourcentage} % </span>
            <br>
            <span> Participation Moyenne </span>
        `

        // insert students in the DOM
        function insertStudentsInTheDOM (studentsList) {
            studentsList.forEach(student => {
                let name = student.fullname
                let matricule = student.matricule
    
                let studentTag = document.createElement('tr')
                let matriculeTag = document.createElement('td')
                let pourcentageTag = document.createElement('td')
                let nameTag = document.createElement('td')
    
                nameTag.innerHTML = name
                matriculeTag.innerHTML = matricule
    
                // calculate the pourcentage
                let nbrAttendances = attendances.filter(attendance => attendance.rf_id === student.rf_id)
                let pourcentage = (nbrAttendances.length / nbrActivities) * 100
                pourcentageTag.innerHTML = `${pourcentage} %`
    
                averagePourcentage += pourcentage
    
                studentTag.appendChild(nameTag)
                studentTag.appendChild(matriculeTag)
                studentTag.appendChild(pourcentageTag)
    
                studentListTag.appendChild(studentTag)
            })
        }

    }()

})