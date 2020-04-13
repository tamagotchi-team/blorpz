
import { blorpPicture } from './__data__/testData'

module.exports={
    createBlorp: (name) => {
        const name = (name)
        const hunger = (Math.floor(Math.random() * 10))
        const awake = true
        const happy = (Math.floor(Math.random() * 10))
        const poo = (1)
        const age = (0)
        const alive = true
        const picture = (blorpPicture[Math.floor(Math.random() * 9)])
        
        return {name, hunger, awake, happy, poo, age, alive, picture}
    }
}