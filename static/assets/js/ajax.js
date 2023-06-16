$(document).ready(() =>{

    const age = $('input[name ="age"]')
    const ageError = $('#age-error')
    const updateAge = $('input[name ="update-age"]')
    const updateAgeError = $('#update-age-error')


    //checking age input against regular expression
    const validateUpdateAge = ()=>{
        const regex = /^\d{0,3}$/
        const updateAgeInput = updateAge.val()

        if(!regex.test(updateAgeInput) || updateAgeInput == ''){
            updateAge.addClass('is-invalid')
            updateAgeError.html('Please enter a valid age')
            return false
        }else{
            updateAge.removeClass('is-invalid')
            updateAge.addClass('is-valid')
            updateAgeError.html('')
        }
        
    }


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

    updateAge.keyup(()=>{
        validateUpdateAge()
    })

    $('.user-add-form').submit(() =>{

    })
})


//ajax call to add user
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
})


const appendUserData = (user) => {
    $('.table > tbody:last-child').append(
        `
        <tr id=user-${user.id}>
        <td class="text-center name">${user.name}</td>
        <td class="text-center address">${user.address}</td>
        <td class='text-center age'>${user.age}</td>
        <td class="mx-1 text-center"><button class="btn btn-danger">Delete</button></td>
        <td class="text-center"><button onClick="editUser(${user.id})" type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#updateModal">Edit</button></td>
        </tr>

        `
    ) 
}

//to display user's current details on update form
const editUser = (id) =>{
    if(id){
        const tr_id = '#user-' + id
        const name = $(tr_id).find('.name').text()
        const address = $(tr_id).find('.address').text()
        const age = $(tr_id).find('.age').text()
        
        $('#id').val(id)
        $('#update-name').val(name)
        $('#update-address').val(address)
        $('#update-age').val(age)
    }
}

// ajax call to update user 

$('#update-user-form').submit((e)=>{
    e.preventDefault()
    const name = $('#update-name').val().trim()
    const address = $('#update-address').val().trim()
    const age = $('#update-age').val().trim()
    const id = $('#id').val().trim()
    $.ajax({
        url:'update-user/',
        data:{
            'id':id,
            'name':name,
            'address':address,
            'age':age,
        },
        dataType:"json",
        success:((data)=>{
            if(data.user){
               updateUserData(data.user) 
            }
        })
    })
    $('#update-user-form').trigger('reset')
    // $('#updateModal').modal('toggle')
    return false
})

// function to update user data 

const updateUserData = (user) =>{
    const tr_id = $('#user-'+user.id)
    $(tr_id).find('.name').text(user.name)
    $(tr_id).find('.address').text(user.address)
    $(tr_id).find('.age').text(user.age)
}