const xhr = require('xhr')
const webrtc2images = require('webrtc2images')

const rtc = new webrtc2images({
	width : 400,
	heigth : 400,
	frames : 20,
	type : 'image/jpeg',
	quality : 0.6,
	interval : 200
})

rtc.startVideo(function(err){
  if (err) return logError(err)

})

const record = document.querySelector('#record')

record.addEventListener('click', function (e) {
  e.preventDefault()

  //indicamos que grabe 
  rtc.recordVideo(function(err, frames){
  	if (err) return logError(err)
  	//enviar informacion del cliente al servidor
  	xhr({
  		uri: '/process',
  		method: 'post',
  		headers: {'Content-Type': 'application/json'},
  		body: JSON.stringify({images: frames})
  	}, function (err,res,body){
  		if (err) return logError(err)
  		console.log(JSON.parse(body))
  	})
  })
}, false)

function logError (err) {
	console.error(err)
}
