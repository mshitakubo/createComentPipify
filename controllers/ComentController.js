var fetch = require('node-fetch')

module.exports = {

    create (req, res){
        var error;
        var arrayComent = [
            {
              "id": 404901208,
              "coment": "Comentário nr1"
            },
            {
              "id": 404901143,
              "coment": "Comentário nr1"
            }
          ];

        
        arrayComent.forEach(async value => {


            var query =`mutation {
                            createComment(
                              input: {
                                card_id: ${value.id}
                                text: "${value.coment}"
                              }
                            ) {
                              comment {
                                id
                                text
                              }
                            }
                          }`
            
            var result
            const url = 'https://app.pipefy.com/graphql';
        
            var options = {
              method: 'POST',
              headers: {
                Authorization: 'Bearer your_token',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ query })
            };
        
            await fetch(url, options)
              .then(res => res.json())
              .then(json => { result = json })
              .catch(err => console.error('error:' + err));
        
            return result.data.createComment.comment.id

            try{
                console.log('Card Id: ' + result.data.createComment.comment.id +' comentário inserido com sucesso!')
             }catch(e) {
                console.log('Card Id: ' + result.data.createComment.comment.id + ", erro no create: " + e)
                error = true
             }

        })

        if(!error){
            res.send('Compilado com sucesso').status(201)
        } else {
            res.send('Erro na criação').status(200)
        }
    }

}