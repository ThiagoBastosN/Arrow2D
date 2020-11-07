class Arrow2D
{
    static add(firstVector, secondVector)
    {
        if((firstVector && secondVector) instanceof VectorForm)
        {
            const xPart = firstVector.x + secondVector.x;
            const yPart = firstVector.y + secondVector.y;
    
            const result = createVector(xPart, yPart, false);
    
            return result;
        }

        if((firstVector && secondVector) instanceof ArrayForm || (firstVector && secondVector) instanceof Array)
        {
            const xPart = (firstVector[0] || firstVector.coordinates[0]) + (secondVector[0] || secondVector.coordinates[0]);
            const yPart = (firstVector[1] || firstVector.coordinates[1]) + (secondVector[1] || secondVector.coordinates[1]);
    
            const result = createVector(xPart, yPart, true);;
    
            return result;
        }

        return new Error('Parameter has to be a vector or an array.');
    }

    static sub(firstVector, secondVector)
    {
        if((firstVector && secondVector) instanceof VectorForm)
        {
            const xPart = firstVector.x - secondVector.x;
            const yPart = firstVector.y - secondVector.y;
    
            const result = createVector(xPart, yPart, false)
    
            return result;
        }

        if((firstVector && secondVector) instanceof ArrayForm || (firstVector && secondVector) instanceof Array)
        {
            const xPart = (firstVector[0] || firstVector.coordinates[0]) - (secondVector[0] || secondVector.coordinates[0]);
            const yPart = (firstVector[1] || firstVector.coordinates[1]) - (secondVector[1] || secondVector.coordinates[1]);
    
            const result = createVector(xPart, yPart, true);
    
            return result;
        }

        return new Error('Parameter has to be a vector or an array.');
    }

    static scalarDiv(vector, scalar)
    {
        if(typeof(scalar) != typeof(1)) return new Error('Scalar has to be a number')
        
        if(vector instanceof VectorForm)
        {
            const xPart = vector.x / scalar;
            const yPart = vector.y / scalar;
            return createVector(xPart, yPart, false);
        }

        if(vector instanceof ArrayForm || vector instanceof Array)
        {
            const xPart = (vector[0] || vector.coordinates[0]) / scalar;
            const yPart = (vector[1] || vector.coordinates[1]) / scalar;
            return createVector(xPart, yPart, false);
        }

        return new Error('Parameter has to be a vector or an array.');
    }

    static vectorToArray(vector)
    {
        if(!(vector instanceof VectorForm)) return new Error('Parameter has to be a vector');

        const vectorArray = createVector(vector.x, vector.y, true);
        return vectorArray;
    }

    static arrayToVector(array)
    {
        if(!(array instanceof ArrayForm) && !(array instanceof Array)) return new Error('Parameter has to be an array');

        const arrayVector = createVector(array[0] || array.coordinates[0], array[1] || array.coordinates[1], false);
        return arrayVector;
    }

    static dotProduct(firstVector, secondVector)
    {
        if((firstVector && secondVector) instanceof VectorForm)
        {
            const xPart = firstVector.x * secondVector.x;
            const yPart = firstVector.y * secondVector.y;
            
            const result = xPart + yPart;
            return result;
        }

        if((firstVector && secondVector) instanceof ArrayForm || (firstVector && secondVector) instanceof Array)
        {
            const xPart = (firstVector[0] || firstVector.coordinates[0]) * (secondVector[0] || secondVector.coordinates[0]);
            const yPart = (firstVector[1] || firstVector.coordinates[1]) * (secondVector[1] || secondVector.coordinates[1]);
            
            const result = xPart + yPart;
            return result;
        }

        return new Error('Parameter has to be a vector or an array.');
    }

    static angleBetween(firstVector, secondVector, degrees)
    {
        const dotProduct = Arrow2D.dotProduct(firstVector, secondVector);

        if(!(dotProduct instanceof Error))
        {
            const cosineAngle = dotProduct / (firstVector.magnitude * secondVector.magnitude);
            if(!degrees) return Math.acos(cosineAngle);

            return Math.acos(cosineAngle) * 180 / Math.PI;
        }
        return new Error('Parameter has to be a vector.');
    }

    static orthogonalVector(vector)
    {
        if(vector instanceof VectorForm || vector instanceof ArrayForm)
        {
            const ortogVector = createVector(vector.y, -vector.x);
    
            return ortogVector;
        }
        return new Error('Parameter has to be a vector.');
    }
}

class VectorForm
{
    constructor(x = 1, y = 1)
    {
        this.x = x;
        this.y = y;

        this.magnitude = Math.sqrt(this.x * this.x + this.y * this.y);
        
        this.r = Math.random() * 255;
        this.g = Math.random() * 255;
        this.b = Math.random() * 255;

    }
    
    updateMagnitude()
    {
        this.magnitude = Math.sqrt(this.x * this.x + this.y * this.y);
    }

    setCoordinates(x, y)
    {
        this.x = x;
        this.y = y;
        this.updateMagnitude();
    }

    setColors(r, g, b)
    {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    normalize()
    {
        const newX = this.x / this.magnitude;
        const newY = this.y / this.magnitude;
        
        this.setCoordinates(newX, newY);
    }

    add(vectorToAdd)
    {
        if(vectorToAdd instanceof VectorForm)
        {
            const newX = this.x + vectorToAdd.x || 0;
            const newY = this.y + vectorToAdd.y || 0;

            this.setCoordinates(newX, newY);
            return this;
        }

        return new Error('Parameter has to be a vector.');
    }

    sub(vectorToSubtract)
    {
        if(vectorToSubtract instanceof VectorForm)
        {
            const newX = this.x - vectorToSubtract.x || 0;
            const newY = this.y - vectorToSubtract.y || 0;
            
            this.setCoordinates(newX, newY);
            return this;
        }

        return new Error('Parameter has to be a vector.');
    }

    scalarMult(scalar = 1)
    {
        if(!(scalar instanceof Number)) return new Error('Scalar has to be a number');

        const newX = this.x * scalar;
        const newY = this.y * scalar;

        this.setCoordinates(newX, newY);
    }

    scalarDiv(scalar)
    {
        if(scalar === 0) return new Error("Can't divide by 0");
        if(!(scalar instanceof Number)) return new Error('Scalar has to be a number');

        const newX = this.x / scalar;
        const newY = this.y / scalar;

        this.setCoordinates(newX, newY);
        return this;
    }

    constrainMagnitude(constrain)
    {
        const currentMag = this.magnitude;

        if(currentMag >= constrain)
        {
            this.normalize();
            this.scalarMult(constrain);
        }
    }

    heading()
    {
        const heading = Math.atan2(this.y, this.x);
        return heading;
    }
    
    rotate(angle)
    {
        if(!(angle instanceof Number)) return new Error('Scalar has to be a number');

        const sinAngle = Math.sin(angle);
        const cosAngle = Math.cos(angle);
        const newX = this.x * cosAngle - this.y * sinAngle;
        const newY = this.y * cosAngle + this.x * sinAngle;

        this.setCoordinates(newX, newY);
    }

}

class ArrayForm
{
    constructor(x = 1, y = 1)
    {
        this.coordinates = [x, y];
        this.x = x;
        this.y = y;

        this.magnitude = Math.sqrt(this.coordinates[0] * this.coordinates[0] + this.coordinates[1] * this.coordinates[1]);
        
        this.r = Math.random() * 255;
        this.g = Math.random() * 255;
        this.b = Math.random() * 255;

    }

    updateMagnitude()
    {
        this.magnitude = Math.sqrt(this.coordinates[0] * this.coordinates[0] + this.coordinates[1] * this.coordinates[1]);
    }

    setCoordinates(x, y)
    {
        this.coordinates = [x, y];
        this.x = x;
        this.y = y;
        this.updateMagnitude();
    }

    setColors(r, g, b)
    {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    normalize()
    {
        const newX =  this.coordinates[0] / this.magnitude;
        const newY = this.coordinates[1] / this.magnitude;

        this.setCoordinates(newX, newY);
    }

    add(vectorToAdd)
    {
        if(!vectorToAdd instanceof Array && !vectorToAdd instanceof ArrayForm)
        {
            return new Error('Parameter has to be an array.');
        }

        const newX = this.coordinates[0] + vectorToAdd[0] || 0;
        const newY = this.coordinates[1] + vectorToAdd[1] || 0;
        
        this.setCoordinates(newX, newY)
        return this;
    }

    sub(vectorToSubtract)
    {

        if(!vectorToSubtract instanceof Array && !vectorToSubtract instanceof ArrayForm)
        {
            return new Error('Parameter has to be an array.');
        }

        const newX = this.coordinates[0] - vectorToSubtract[0] || 0;
        const newY = this.coordinates[1] - vectorToSubtract[1] || 0;

        this.setCoordinates(newX, newY);
        return this;
    }

    scalarMult(scalar = 1)
    {
        if(!(scalar instanceof Number)) return new Error('Scalar has to be a number');

        const newX = this.coordinates[0] * scalar;
        const newY = this.coordinates[1] * scalar;

        this.setCoordinates(newX, newY);
    }

    scalarDiv(scalar = 1)
    {
        if(scalar === 0) return new Error("Can't divide by 0");
        if(!(scalar instanceof Number)) return new Error('Scalar has to be a number');

        const newX = this.coordinates[0] / scalar;
        const newY = this.coordinates[1] / scalar;

        this.setCoordinates(newX, newY);
        return this;
    }

    constrainMagnitude(constrain)
    {
        const currentMag = this.magnitude;

        if(currentMag >= constrain)
        {
            this.normalize();
            this.scalarMult(constrain);
        }
    }
    
    heading()
    {
        const heading = Math.atan2(this.coordinates[1], this.coordinates[0]);
        return heading;
    }
    
    rotate(angle)
    {
        if(!(angle instanceof Number)) return new Error('Scalar has to be a number');

        const sinAngle = Math.sin(angle);
        const cosAngle = Math.cos(angle);
        const newX = this.coordinates[0] * cosAngle - this.coordinates[1] * sinAngle;
        const newY = this.coordinates[1] * cosAngle + this.coordinates[0] * sinAngle;

        this.setCoordinates(newX, newY);
    }
}



function createVector(x, y, isArray = false)
{
    if(!isArray) return new VectorForm(x, y);

    return new ArrayForm(x, y);
}


module.exports.CreateVector = createVector;
module.exports.StaticArrow2D = Arrow2D