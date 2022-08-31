export default {
    getCollection (items) {
        return Object.keys(items).map(key => items[key])
    },
    getQuery (path, query) {
        return query ? `${path}?${Object.keys(query).map(key => `${key}=${query[key]}`).join('&')}` : path
    },
    updateOne (state, value) {
        let items = JSON.parse(JSON.stringify(state.items))
        items[value._id] = value

        return items
    },
    refresh (values) {
        let items = values.reduce((acc, value) => {
            return { ...acc, [value._id]: value }
        }, {})

        return items
    },
    searchItems (items, search, user) {
        items = [ ...items ]
    
        let sort = search.sort
        delete search.sort
    
        const searchField = function (search, items) {
            let result = [ ...items ]
    
            Object.keys(search).forEach(key => {
                if (typeof search[key] === 'object' && !Array.isArray(search[key]) && search[key] !== null) {
                    let entries = Object.entries(search[key])[0]
    
                    if (entries[0] == '$and') {
                        let results = entries[1].reduce((t, obj) => {
                            return searchField({ [key]: obj }, t)
                        }, result)
    
                        result = results
                    } else if (entries[0] == '$in') {
                        let isString = entries[1] && entries[1][0] && typeof entries[1][0] === 'string'
                        
                        result = result.filter(item => entries[1].find(i => (isString ? i : i[key]) == item[key]))
                    } else if (entries[0] == '$notIn') {
                        let isString = entries[1] && entries[1][0] && typeof entries[1][0] === 'string'
                        
                        result = result.filter(item => !entries[1].find(i => (isString ? i : i[key]) == item[key]))
                    } else if (entries[0] == '$contains') {
                        result = result.filter(item => {
                            return item[key].find(u => u == entries[1])
                        })
                    } else if (entries[0] == '$containsBroad' || entries[0] == '$broad') {
                        result = result.filter(item => {
                            if (Array.isArray(item[key]) && item[key] !== null) {
                                return item[key].find(u => u.toLowerCase() == entries[1].toLowerCase())
                            } else {
                                return item[key].toLowerCase() == entries[1].toLowerCase()
                            }
                        })
                    } else if (entries[0] == '$gte') {
                        result = result.filter(item => {
                            if (moment(item[key]).isValid()) {
                                return moment(item[key]).isAfter(moment(entries[1]))
                            } else {
                                return item[key] >= entries[1]
                            }
                        })
                    } else if (entries[0] == '$lte') {
                        result = result.filter(item => {
                            if (moment(item[key]).isValid()) {
                                return moment(item[key]).isBefore(moment(entries[1]))
                            } else {
                                return item[key] <= entries[1]
                            }
                        })
                    }
                } else if (key == '$in') {
                    result = result.filter(item => search[key].includes(item._id))
                } else if (search[key] == '$notNull') {
                    result = result.filter(item => item[key])
                } else if (search[key] === null || search[key] == '$null') {
                    result = result.filter(item => !item[key])
                } else if (search[key] == '$notSelf') {
                    result = result.filter(item => user && item[key] != user._id)
                } else {
                    let keyValue = Object.keys(search[key])[0]
    
                    if (keyValue == '$isBefore' || keyValue == '$isAfter') {
                        result = result.filter(item => moment(item[key])[keyValue == '$isBefore' ? 'isBefore' : 'isAfter'](Object.values(search[key])[0]))
                    } else {
                        result = result.filter(item => item[key] == search[key])
                    }
                }
            })
    
            return result
        }
    
        if (search.$or) {
            let results = Object.keys(search.$or).map(key => {
                return searchField({ [key]: search.$or[key] }, items)
            })
            
            items = [...new Set(results.reduce((total, current) => [...total, ...current], []))]
        } else {
            items = searchField(search, items)
        }
    
        if (sort) {
            let key = Object.keys(sort)[0]
            let value = Object.values(sort)[0]
    
            items = items.sort((a, b) => {
                if (!a[key] || !b[key]) return false
    
                return value == 'desc' ? moment(a[key]).valueOf() - moment(b[key]).valueOf() : moment(b[key]).valueOf() - moment(a[key]).valueOf()
            })
    
            if (sort.reverse) items = items.reverse()
        } else {
            items = items.sort((a, b) => a.createdAt && b.createdAt ? b.createdAt.valueOf() - a.createdAt.valueOf() : false)
        }
    
        return items
    }
}