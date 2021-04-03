window.addEventListener('DOMContentLoaded', (e) => {

    !async function(){

        const rfIdField = document.querySelector('#rfId')
        const studentNameTag = document.querySelector('.student-name')
        const checkImgTag = document.querySelector('.check-icon')
        const csrfToken = document.querySelector('input[name="csrfmiddlewaretoken"]').value

        
        // get students list from the backend API
        let students = await fetch('student/api/students')
            .then(response => response.json())
            .then(data => data)
            .catch(err => console.error(err))

        const signAttendance = (rfId) => {

            let data = {rf_id: rfId}

            fetch('attendance/api/attendances', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => console.log('Success: ', data))
            .catch(err => console.error('Error: ', err))
        }

        /*
         * POINTAGE
         */
        rfIdField.addEventListener('keyup', (event) => {
            // on enter key up
            if (event.keyCode === 13) {
                // test if the student is enroled
                let student = students.find(st => st.rf_id == rfIdField.value)

                if(student) {
                    studentNameTag.innerText = student.fullname
                    checkImgTag.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                        </svg>
                    `
                    // then record the presence
                    signAttendance(rfIdField.value)

                    rfIdField.value = ''
                    checkImgTag.classList.remove('error')
                    checkImgTag.classList.add('success')

                } else {
                    studentNameTag.innerHTML = `<div style="color:red;">VOUS N'ETES PAS ENCORE ENREGISTRE</div>`
                    rfIdField.value = ''
                    checkImgTag.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                        </svg>
                    `
                    checkImgTag.classList.remove('success')
                    checkImgTag.classList.add('error')
                }
            }
        })
        
    }()

})