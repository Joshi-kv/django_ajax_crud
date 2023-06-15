$(document).ready(() =>{

    const age = $('input[name ="age"]')
    const ageError = $('.age-error')
    
    const validateAge = ()=>{
        const regex = /^\d{0,3}$/
        const ageInput = age.val()
        if(!regex.test(ageInput)){
            age.addClass('is-invalid')
            ageError.html('Please enter valid age')
            ageError.addClass('invalid-tooltip')
            return false
        }else{
            age.removeClass('is-invalid')
            age.addClass('is-valid')
        }
    }

    age.keyup(()=>{
        validateAge()
        console.log(ageError)
    })

    $('.user-add-form').submit(() =>{

    })
})