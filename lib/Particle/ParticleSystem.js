class ParticleSystem {
    constructor(x, y, particleProperty) {
        this._x = x;
        this._y = y;
        this._count =  particleProperty.count;
        this._particles = [];
        this._generateParticles(this._x, this._y, particleProperty);
        this._time = 0;
        this._maxTime = particleProperty.time;
        this._particleProperty = particleProperty;
    }
    _generateParticles(x, y, particleProperty){
        this._particles = [];
        for (let i = 0; i < this._count; i ++){
            let particle = new Particle(x, y, particleProperty);
            this._particles.push(particle);
        }

    }
    draw(){
        if (this._time < this._maxTime) {
            for (let particle of this._particles) {
                particle.draw();
            }
            this._time++;
        }
    }
    resume(x, y){
        this._x = x;
        this._y = y;
        this._time = 0;
        this._generateParticles(x, y, this._particleProperty);
    }
}