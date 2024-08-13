const {Schema , model} = require ("mongoose");

const serviceSchema = new Schema({
        title: {
          type: String,
          required: true, // cannot be left empty
        },
        description: {
          type: String,
          required: true,
        },
        instructor_id: {
          type: Schema.Types.ObjectId, // Reference to an instructor
          required: true,
        },
        category: {
          type: String,
          required: true
        },
        duration: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        }
      });


      const Service = new model("Service",serviceSchema);

      module.exports = Service;
