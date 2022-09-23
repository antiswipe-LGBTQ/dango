import moment from 'moment'

export function randomBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export function randomizeArray(array) {
    var currentIndex = array.length, temporaryValue, randomIndex

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex -= 1

        temporaryValue = array[currentIndex]
        array[currentIndex] = array[randomIndex]
        array[randomIndex] = temporaryValue
    }
    
    return array
}

export function sortDate (items, property = 'date', invert = false) {
    items = items.slice()
    return items.sort((a, b) => invert ? a[property].diff(b[property]): b[property].diff(a[property]))
}

export function sortPastFuture (items, property = 'date') {
    let pastItems = items.filter(item => item[property].isBefore(new Date())).sort((a, b) => b[property].diff(a[property]))
    let futureItems = items.filter(item => item[property].isAfter(new Date())).sort((a, b) => a[property].diff(b[property]))

    return [ ...futureItems, ...pastItems ]
}

export function setPropertyFor (items, search, value) {

    return items.map(item => ({
        ...item, [Object.keys(value)[0]]: item[Object.keys(search)[0]] == Object.values(search)[0] ? Object.values(value)[0] : item[Object.keys(value)[0]]
    }))
}

export function groupBy (items, types, params = {}) {
    if (!Array.isArray(types)) types = [ types ]

    const groupItem = function (item, types, total, params) {
        let $groupData = {}
        let stop = false
        let id = ''

        types.forEach(type => {
            if (item[type] instanceof Array) {
                item[type].forEach(id => {
                    if (!total[id]) {
                        total[id] = { $groupData, items: [ item ] }
                    } else {
                        total[id] = {
                            ...total[id],
                            items: [ ...total[id].items, item ]
                        }
                    }
                })

                stop = true
            } else if (typeof type === 'object') {
                let key = Object.keys(type)[0]
                let value = item[key]

                $groupData[key] = item[Object.keys(type)[0]]
                
                if (Object.values(type)[0] == '$month') {
                    id += moment(value).format('YYYYMM')
                } else if (Object.values(type)[0].startsWith('$days')) {
                    let max = parseInt(Object.values(type)[0].match(/\d+/)[0])
                    
                    let result = Object.entries(total).find(o => {
                        return moment(value).startOf('day').isBetween(
                            moment(o[1].$groupData[key]).subtract(max, 'days'),
                            moment(o[1].$groupData[key])
                        )
                    })

                    if (result) {
                        $groupData = {
                            ...$groupData,
                            startDate: moment(value).startOf('day').subtract(max, 'days').toDate(),
                            endDate: moment(value).startOf('day').toDate()
                        }
                        
                        id += moment(result[1].$groupData.startDate).startOf('day').format('YYYYMMDD')
                    } else {
                        $groupData = {
                            ...$groupData,
                            startDate: moment(value).startOf('day').subtract(max, 'days').toDate(),
                            endDate: moment(value).startOf('day').toDate()
                        }
                        
                        id += moment(value).startOf('day').subtract(max, 'days').format('YYYYMMDD')
                    }
                } 
            } else {
                $groupData[type] = item[type]
                id += item[type]
            }
        })

        if (!stop) {
            if (!total[id]) {
                total[id] = { $groupData, items: [ item ] }
            } else {
                total[id] = {
                    ...total[id],
                    items: params?.reverseItems ? [ item, ...total[id].items ] : [ ...total[id].items, item ]
                }
            }
        }

        return total
    }

    let result = {}
    
    items.forEach(item => {
        result = groupItem(item, types, result, {
            reverseItems: params.reverseItems
        })
    })

    if (params.orderBy) {
        result = Object.entries(result).sort((a, b) => b[1].items.length - a[1].items.length)
    }

    return result
}