function AvitoStat({ Schema }) {
    this.getModel = getModel

    function getModel() {
        return new Schema({
            _id: {
                type: "UInt64",
                normalizer: ((ad, value) => {
                    return ad.ad_id
                })
            },
            date: {
                type: "TEXT",
                normalizer: ((ad, value) => {
                    return ad.ad.date
                })
            },
            user_id: {
                type: "UInt32",
                normalizer: ((ad, value) => {
                    return ad.ad.user_id
                })
            },
            itemId: {
                type: "UInt32",
                normalizer: ((ad, value) => {
                    return ad.ad.itemId
                })
            },
            calls_answered: {
                type: "UInt32",
                normalizer: ((ad, value) => {
                    return ad.ad.calls_answered
                })
            },
            calls: {
                type: "UInt32",
                normalizer: ((ad, value) => {
                    return ad.ad.calls
                })
            },
            calls_new: {
                type: "UInt32",
                normalizer: ((ad, value) => {
                    return ad.ad.calls_new
                })
            },
            calls_newAnswered: {
                type: "UInt32",
                normalizer: ((ad, value) => {
                    return ad.ad.calls_newAnswered
                })
            },

            uniqContacts: {
                type: "UInt32",
                normalizer: ((ad, value) => {
                    return ad.ad.uniqContacts
                })
            },
            uniqFavorites: {
                type: "UInt32",
                normalizer: ((ad, value) => {
                    return ad.ad.uniqFavorites
                })
            },
            uniqViews: {
                type: "UInt32",
                normalizer: ((ad, value) => {
                    return ad.ad.uniqViews
                })

            }
        })
    }
}

export default AvitoStat