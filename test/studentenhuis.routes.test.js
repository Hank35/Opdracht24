const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');

chai.should();
chai.use(chaiHttp);

describe('Studentenhuis API POST', () => {

    before(function(){
        global.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyU2VydmVyIjp7ImlkIjoxLCJlbWFpbCI6ImpzbWl0QHNlcnZlci5ubCIsInBhc3N3b3JkIjoic2VjcmV0In0sImlhdCI6MTUyNjQ2NTk5NH0.op09JZf4AFeV_VQ30aDDwcJZCEEOoxPfsE84Sgl2Fq0';
    });

    it('should throw an error when using invalid JWT token', (done) => {

        let token = '69sGijy7PLcokf4EhtAY';

        chai.request(server)
            .post('/api/studentenhuis')
            .set('Authorization', token)
            .end( (err, res) => {
                res.should.have.status(400);
            });

        done()

    });

    it('should return a studentenhuis when posting a valid object', (done) => {

        let studentenhuis = {
            naam: 'Lovensdijk',
            adres: 'Lovensdrijkstraat, Breda'
        };

        chai.request(server)
            .post('/api/studentenhuis')
            .set('Authorization', global.token)
            .send(studentenhuis)
            .end( (err, res) => {
                res.should.have.status(200);
                res.should.be.a('object');
                res.body.should.have.property('ID');
                res.body.should.have.property('Naam');
                res.body.should.have.property('Adres');
                res.body.should.have.property('UserID');
            });

        done()

    });

    it('should throw an error when naam is missing', (done) => {

        let studentenhuis = {
            adres: 'Lovensdijkstraat, Breda'
        };

        chai.request(server)
            .post('/api/studentenhuis')
            .set('Authorization', global.token)
            .send(studentenhuis)
            .end( (err, res) => {
                res.should.have.status(412);
            });

        done()

    });

    it('should throw an error when adres is missing', (done) => {

        let studentenhuis = {
            naam: 'Lovensdijk'
        };

        chai.request(server)
            .post('/api/studentenhuis')
            .set('Authorization', global.token)
            .send(studentenhuis)
            .end( (err, res) => {
                res.should.have.status(412);
            });

        done();

    })
});

describe('Studentenhuis API GET all', () => {
    it('should throw an error when using invalid JWT token', (done) => {

        let token = '69sGijy7PLcokf4EhtAY';

        chai.request(server)
            .get('/api/studentenhuis')
            .set('Authorization', token)
            .end( (err, res) => {
                res.should.have.status(400);
            });

        done()

    });

    it('should return all studentenhuizen when using a valid token', (done) => {

        chai.request(server)
            .get('/api/studentenhuis')
            .set('Authorization', global.token)
            .end( (err, res) => {
                res.body.should.be.a('array');
            });

        done();

    })
});

describe('Studentenhuis API GET one', () => {
    it('should throw an error when using invalid JWT token', (done) => {

        let token = '69sGijy7PLcokf4EhtAY';

        chai.request(server)
            .get('/api/studentenhuis/1')
            .set('Authorization', token)
            .end( (err, res) => {
                res.should.have.status(401);
            });

        done();

    });

    it('should return the correct studentenhuis when using an existing huisId', (done) => {

        
        chai.request(server)
            .get('/api/studentenhuis/1')
            .set('Authorization', global.token)
            .end( (err, res) => {
                res.should.have.status(200);
                res.should.be.a('object');
            });


        done()
    });

    it('should return an error when using an non-existing huisId', (done) => {

        chai.request(server)
            .get('/api/studentenhuis/420')
            .set('Authorization', global.token)
            .end( (err, res) => {
                res.should.have.status(404);
            });

        done()
    })
});

describe('Studentenhuis API PUT', () => {
    it('should throw an error when using invalid JWT token', (done) => {

        let token = '69sGijy7PLcokf4EhtAY';

        chai.request(server)
            .put('/api/studentenhuis/1')
            .set('Authorization', token)
            .end( (err, res) => {
                res.should.have.status(401);
            });

        done();

    });

    it('should return a studentenhuis with ID when posting a valid object', (done) => {

        let studentenhuis = {
            naam: 'Lovensdijk',
            adres: 'Lovensdijkstraat, Breda'
        };

        chai.request(server)
            .put('/api/studentenhuis/75')
            .send(studentenhuis)
            .set('Authorization', global.token)
            .end( (err, res) =>{
                res.should.have.status(200);
                res.should.be.a('object');
                res.body.should.have.property('ID');
            });

        done()

    });

    it('should throw an error when naam is missing', (done) => {

        let studentenhuis = {
            adres: 'Lovensdrijkstraat, Breda'
        };

        chai.request(server)
            .put('/api/studentenhuis/7')
            .send(studentenhuis)
            .set('Authorization', global.token)
            .end( (err, res) => {
                res.should.have.status(412)
            });

        done()

    });

    it('should throw an error when adres is missing', (done) => {

        let studentenhuis = {
            naam: 'Lovensdijk'
        };

        chai.request(server)
            .put('/api/studentenhuis/7')
            .send(studentenhuis)
            .set('Authorization', global.token)
            .end( (err, res) => {
                res.should.have.status(412)
            });

        done();

    })
});

describe('Studentenhuis API DELETE', () => {
    it('should throw an error when using invalid JWT token', (done) => {

        let token = '69sGijy7PLcokf4EhtAY';

        chai.request(server)
            .delete('/api/studentenhuis/8')
            .set('Authorization', token)
            .end( (err, res) => {
                res.should.have.status(401);
            });

        done()

    });

    
    it('should return a studentenhuis when posting a valid object', (done) => {
    
        chai.request(server)
            .delete('/api/studentenhuis/8')
            .set('Authorization', global.token)
            .end( (err, res) => {
                res.should.be.a('object');
                res.should.have.status(200);
            });
    
        done()
    
    });
    
    it('should throw an error when naam is missing', (done) => {

        let studentenhuis = {
            adres: "Heemraadssingel 85"
        }
        
        chai.request(server)
            .delete('/api/studentenhuis/8')
            .set('Authorization', global.token)
            .end((err, res) => {
                res.should.have.status(412)
            });     
    
    
    
        done()
    
    });
    
    it('should throw an error when adres is missing', (done) => {


        let studentenhuis = {
            naam: "Lovendijk"
        }
        
        chai.request(server)
            .delete('/api/studentenhuis/8')
            .set('Authorization', global.token)
            .end((err, res) => {
                res.should.have.status(412)
            });
    
    
    
        done()
    
    })
});

