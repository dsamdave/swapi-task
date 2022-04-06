import { Request, Response } from "express";
import axios from 'axios'

import { IDataObj } from '../interface/interface'




const jediMasterCtrl = {

  // Route to test the API
  welcome: async (req: Request, res: Response) => {
    
    try {

      return res.status(200).json({msg: "Welcome to my Node App, now go to /task" })

    } catch (err: any) {

      return res.status(500).json({msg: err.message})

    }
  },


  // Route for the tasks
  task: async (req: Request, res: Response) => {
    
    try {

      const BASE_URL = `https://swapi.dev/api/`

      // Get Request to find Darth Vader's starship

      const people = await axios.get(BASE_URL + '/people/');
      
      const peopleArray = (people.data.results)

      const DarthInfo = peopleArray.filter( (person: any)  => {

        return person.name == "Darth Vader"
        
      })

      const darthStarshipKey = (DarthInfo[0].starships)

      let darthStarshipInfo

      if(!darthStarshipKey){

        darthStarshipInfo = {}

      } else {

        const starship = await axios.get(darthStarshipKey[0]);

        darthStarshipInfo = (starship.data)
      }



      // Get Request to check the number of crew on death star starship

      const starships = await axios.get(BASE_URL + '/starships/');

      const starshipsArray = (starships.data.results)

      const deathStarInfo = starshipsArray.filter( (starship: any)  => {
        
        return starship.name == "Death Star"
        
      })

      let numberOfCrew;

      if(!deathStarInfo){
        numberOfCrew = {}
      } else {

        numberOfCrew = deathStarInfo[0].crew
      }





      // Block of codes to double check if Princess Leia is on Planet Alderaan (Leia Organa)

      const princessLeia = peopleArray.filter( (person: any )  => {

        return person.name == "Leia Organa"
        
      })

      const princessLeiaUrl = princessLeia[0].homeworld

      const planet = await axios.get(princessLeiaUrl);

      const princessLeiaPlanet = (planet.data)

      let isLeiaOnAlderaan

      if(princessLeiaPlanet.name !== "Alderaan"){

        isLeiaOnAlderaan = false

      }else{

        isLeiaOnAlderaan = true

      }


      
      // Results of task returned as an object

      const dataObj : IDataObj = {

        starship : {

          name: darthStarshipInfo.name,
          model: darthStarshipInfo.model
        },
        crew: numberOfCrew,
        isLeiaOnPlanet: isLeiaOnAlderaan
      }

      return res.status(200).json(dataObj)
    
    } catch (err: any) {

      return res.status(500).json({msg: err.message})
      
    }
  }

}




export default jediMasterCtrl;
