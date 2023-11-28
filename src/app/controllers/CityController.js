import Cities from "../models/Cities.js";

class CityController {
    get_cities(req, res, next) {
        Cities.find({})
            .then(cities => {
                cities = cities.map(city => city.name);
                // console.log(cities);
                res.json(cities);
            })
            .catch(err => {
                res.status(400).json({ error: err })
            })
    }
    get_districts(req, res, next) {
        var nameCity = req.params.city;
        Cities.findOne({name: nameCity})
            .then(city => {
                // console.log(city);
                var districts = city.districts;
                // console.log(districts);
                districts = districts.map(district => district.name);
                console.log(districts)
                res.json(districts);
            })
            .catch(err => {
                res.status(400).json({ error: err })
            })
    }

    get_commune(req, res, next) {
        var nameCity = req.params.city;
        var nameDistrict = req.params.district;
        Cities.findOne({name: nameCity})
            .then(city => {
                console.log(city.districts);
                var districts = city.districts;
                districts.forEach(district => {
                    if(district.name === nameDistrict) {
                        var communes = district.communes;
                        communes = communes.map(commune => commune.name);
                        res.json(communes);
                        
                    } 
                })
            })
    }

    get_postal_code(req, res, next) {
        var nameCity = req.params.city;
        var nameDistrict = req.params.district;
        var nameCommune = req.params.commune;
        Cities.findOne({name: nameCity})
            .then(city => {
                console.log(city.districts);
                var districts = city.districts;
                districts.forEach(district => {
                    if(district.name === nameDistrict) {
                        var communes = district.communes;
                        communes.forEach(commune => {
                            if(commune.name === nameCommune) {
                                var postal_codes = commune.postal_code;
                                res.json(postal_codes)
                            }
                        })
        
                        
                    } 
                })
            })
    }

    get_all_postal_code(req, res, next) {
        var nameCity = req.params.city;
        var nameDistrict = req.params.district;
        var nameCommune = req.params.commune;
        Cities.findOne({name: nameCity})
            .then(city => {
                console.log(city.districts);
                var districts = city.districts;
                districts.forEach(district => {
                    if(district.name === nameDistrict) {
                        var communes = district.communes;
                        var warehouse_code = district.warehouse_code;
                        communes.forEach(commune => {
                            if(commune.name === nameCommune) {
                                var postal_codes = commune.postal_code;
                                postal_codes = postal_codes.concat(warehouse_code)
                                res.json(postal_codes)
                            }
                        })    
                    } 
                })
            })
    }
}

export default new CityController;
