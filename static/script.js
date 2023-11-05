$(document).ready(function(){
    console.log('Ready')

    // Fetch the current date and update it in the DOM
    var date = new Date
    let display_date = "Date: " + date.toLocaleDateString()

    $(document).ready(function(){
        $("#display_date").html(display_date)
    })

    // Write an event, when Submit button is clicked
    $('#button').click(function(){
        
        // Get the text value from the textarea using the 'val()' method
        let text_value = $('#text').val()

        // Convert it to JS object.
        // Provide a 'key' here and in write the same in app.py file as well to extract data
        let input_text = {'text' : text_value}
        console.log(input_text)

        // Ajax request
        $.ajax({

            // Type of web request
            type : 'POST',
            
            // URL
            url : "/predict_emotion",

            // Data to be sent in JSON format
            data : JSON.stringify(input_text),

            // Type of response expected is json
            dataType : 'json',

            // contentType
            contentType : 'application/json',

            // If everything is successful, run this function
            success : function(result){

                // Extract prediction and emoticon url from result
                predicted_emotions = result.data.predicted_emotion,
                emo_url = result.data.predicted_emotion_img_url

                // Update the DOM elements
                $('#prediction').html(predicted_emotions)
                $('#prediction').css('display', 'block')

                $('#emo_img_url').attr('src', emo_url)
                $('#emo_img_url').css('display', 'block')
            },

            // If any error, run this function
            error : function(result){
                console.log(result)
            }
        })

        // Clearing the textbox after every button push
        $('#text').val("")
    })

})