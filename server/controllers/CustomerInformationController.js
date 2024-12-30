class CustomerInformationController {
    async getCustomerById(req, res, next) {
        try {
            throw new Error("Not implemented");
        } catch (err) {
            console.log("Error in getCustomerById:", err);
            next(err);
        }
    }

    async createEpicForCustomer(req, res, next) {
        try {
            throw new Error("Not implemented");
        } catch (err) {
            console.log("Error in createEpicForCustomer:", err);
            next(err);
        }
    }

    async updateCustomerData(req, res, next) {
        try {
            throw new Error("Not implemented");
        } catch (err) {
            console.log("Error in updateCustomerData:", err);
            next(err);
        }
    }

    async updateEpicsOrder(req, res, next) {
        try {
            throw new Error("Not implemented");
        } catch (err) {
            console.log("Error in updateEpicsOrder:", err);
            next(err);
        }
    }

    async deleteCustomerById(req, res, next) {
        try {
            throw new Error("Not implemented");
        } catch (err) {
            console.log("Error in deleteCustomerById:", err);
            next(err);
        }
    }
}

module.exports = new CustomerInformationController();
