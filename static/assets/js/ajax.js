$(document).ready(() =>{

    const age = $('input[name ="age"]')
    const ageError = $('#age-error')
    
    const validateAge = ()=>{
        const regex = /^\d{0,3}$/
        const ageInput = age.val()
        if(!regex.test(ageInput)){
            age.addClass('is-invalid')
            ageError.html('Please enter a valid age')
            return false
        }else{
            age.removeClass('is-invalid')
            age.addClass('is-valid')
            ageError.html('')
        }
    }

    age.keyup(()=>{
        validateAge()
    })

    $('.user-add-form').submit(() =>{

    })
})

$('.user-add-form').submit((e)=>{
    e.preventDefault()
    let nameInput = $('input[name ="name"]').val().trim()
    let addressInput = $('textarea[name ="address"]').val().trim()
    let ageInput = $('input[name ="age"]').val().trim()

    $.ajax({
        url:'create-user/',
        data:{
            'name':nameInput,
            'address':addressInput,
            'age':ageInput
        },
        dataType:'json',
        success:(data)=>{
            if(data.user){
                appendUserData(data.user)
            }else{
                console.log('Error')
            }
            
        }
    })
    $('.user-add-form').trigger('reset')
    // return false
})


const appendUserData = (user) => {
    $('.table > tbody:last-child').append(
        `
        <tr id=${user.id}>
        <td class="text-center">${user.name}</td>
        <td class="text-center">${user.address}</td>
        <td class='text-center'>${user.age}</td>
        <td class="mx-1 text-center"><button class="btn btn-danger">Delete</button></td>
        <td class="text-center"><button class="btn btn-success">Edit</button></td>
        </tr>

        `
    ) 
}