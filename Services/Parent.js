export default parent = {

    async getChildrenOfParent () {
        let parentId = await idStorage.retrieveItem("IdEnfant")
        let token = await idStorage.retrieveItem("token")
        var req = {
            method: 'GET',
            headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer '+ token
            },
        }

        const response = await axios(urlServer+'enfant/parent/enfants/'+ parentId, req)

        this.setState({
            user: response.data
        })

        let newTierces = []
        if (result.data.tierceAutorises) {
            newTierces = Array.from(result.data.tierceAutorises, (tierce => Object.assign({}, tierce, { "PrenomNomTierce": toUpperCaseFirst(tierce.nom) + " " + toUpperCaseFirst(tierce.prenom) })))
        }

        this.setState({
            tierces: newTierces
        })
    }
}