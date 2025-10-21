/*=============== MOSTRAR/ESCONDER SENHA LOGIN ===============*/
const passwordAccess = (loginPass, loginEye) =>{
   const input = document.getElementById(loginPass),
         iconEye = document.getElementById(loginEye)

   iconEye.addEventListener('click', () =>{
      // Muda senha pra texto
      input.type === 'password' ? input.type = 'text'
						              : input.type = 'password'

      // Muda icone
      iconEye.classList.toggle('ri-eye-fill')
      iconEye.classList.toggle('ri-eye-off-fill')
   })
}
passwordAccess('password','loginPassword')

/*=============== MOSTRAR/ESCONDER SENHA CRIAR CONTA ===============*/
const passwordRegister = (loginPass, loginEye) =>{
   const input = document.getElementById(loginPass),
         iconEye = document.getElementById(loginEye)

   iconEye.addEventListener('click', () =>{
      // Muda senha pra texto
      input.type === 'password' ? input.type = 'text'
						              : input.type = 'password'

      // Muda icone
      iconEye.classList.toggle('ri-eye-fill')
      iconEye.classList.toggle('ri-eye-off-fill')
   })
}
passwordRegister('passwordCreate','loginPasswordCreate')

/*=============== MOSTRAR/ESCONDER LOGIN E CRIAR CONTA ===============*/
const loginAcessRegister = document.getElementById('loginAccessRegister'),
      buttonRegister = document.getElementById('loginButtonRegister'),
      buttonAccess = document.getElementById('loginButtonAccess')

buttonRegister.addEventListener('click', () => {
   loginAcessRegister.classList.add('active')
})

buttonAccess.addEventListener('click', () => {
   loginAcessRegister.classList.remove('active')
})
