/**
 * Created by sergeisafrigin on 5/3/16.
 */

function FormEditor(defaultStatus) {

    this.onStatusChangedListeners = [];
    this.shouldShowDeleteButtonConditions = [];
    this.onCancelListeners = [];
    this.status = angular.isDefined(defaultStatus) ? defaultStatus : FormEditor.status.READ_ONLY;
}

/**
 * possible form statuses
 * @type {{EDIT: string, CREATE: string, READ_ONLY: string}}
 */
FormEditor.status = {
    EDIT: "edit",
    CREATE: "create",
    READ_ONLY: "read"
};


/**
 * on status changed, notify all status changed listeners
 */
FormEditor.prototype.onStatusChanged = function () {

    var status = this.status;

    this.onStatusChangedListeners.forEach(function (lsn) {
        if (angular.isDefined(lsn)) {
            lsn(status);
        }
    });
};

/**
 * change status
 * @param lsn
 */
FormEditor.prototype.changeStatus = function (status) {
    if (status == FormEditor.status.CREATE || status == FormEditor.status.EDIT || status == FormEditor.status.READ_ONLY) {
        this.status = status;
        this.onStatusChanged();
    }
};

/**
 * add on status changed listener
 * @param lsn
 */
FormEditor.prototype.addOnStatusChangedListener = function (lsn) {
    this.onStatusChangedListeners.push(lsn);
};


/**
 * is form in editing mode
 * @returns {boolean}
 */
FormEditor.prototype.isEditing = function () {
    return this.status == FormEditor.status.EDIT || this.status == FormEditor.status.CREATE;
};

/**
 * check if in creating status
 * @returns {boolean}
 */
FormEditor.prototype.isCreating = function () {
    return this.status == FormEditor.status.CREATE;
};

/**
 * check if in read only status
 * @returns {boolean}
 */
FormEditor.prototype.isReadOnly = function () {
    return this.status == FormEditor.status.READ_ONLY;
};

/**
 * check if sohuld show the edit button
 * @returns {boolean}
 */
FormEditor.prototype.shouldShowEditButton = function () {
    //TODO add listeners
    return this.isReadOnly();
};

/**
 * check if should show the save button
 * @returns {boolean}
 */
FormEditor.prototype.shouldShowSaveButton = function () {
    //TODO add listeners

    return !this.isReadOnly();
};


/**
 * check if should show the cancel button
 * @returns {boolean}
 */
FormEditor.prototype.shouldShowCancelButton = function () {
    //TODO add listeners
    return this.status == FormEditor.status.EDIT;
};

/**
 * add new should delete button condition
 * @param condition
 */
FormEditor.prototype.addShouldShowDeleteButtonCondition = function (condition) {
    this.shouldShowDeleteButtonConditions.push(condition);
};


/**
 * check if sohuld show the delete button
 * @returns {boolean}
 */
FormEditor.prototype.shouldShowDeleteButton = function () {


    for (var i = 0; i < this.shouldShowDeleteButtonConditions.length; i++) {

        var condition = this.shouldShowDeleteButtonConditions[i];

        if (angular.isFunction(condition)) {
            condition = condition();
        }

        if (!condition) {
            return false;
        }
    }

    return this.isReadOnly();
};


/**
 * set on edit listener
 * @param lsn
 */
FormEditor.prototype.setOnEditListener = function (lsn) {
    this.onEditListener = lsn;
};


/**
 * on edit button clicked
 */
FormEditor.prototype.onEdit = function () {

    var self = this;

    if (self.shouldShowEditButton()) {

        if (angular.isDefined(self.onEditListener)) {
            self.onEditListener(function () {

                self.status = FormEditor.status.EDIT;

                //notify on status changed
                self.onStatusChanged();

            });
        } else {

            self.status = FormEditor.status.EDIT;

            //notify on status changed
            self.onStatusChanged();

        }
    }
};


/**
 * set on cancel edit listener
 * @param lsn
 */
FormEditor.prototype.addOnCancelEditListener = function (lsn) {

    if (angular.isDefined(lsn)) {
        this.onCancelListeners.push(lsn);
    }
};

/**
 * on cancel edit button clicked
 */
FormEditor.prototype.onCancelEdit = function () {

    var self = this;

    if (self.shouldShowCancelButton()) {

        if (self.onCancelListeners.length > 0) {

            self.onCancelListeners.forEach(function (onCancelEditListener) {

                onCancelEditListener(function () {
                    self.status = FormEditor.status.READ_ONLY;

                    //notify on status changed
                    self.onStatusChanged();
                });
            });

        } else {
            self.status = FormEditor.status.READ_ONLY;

            //notify on status changed
            self.onStatusChanged();
        }

    }

    //TODO handle cancel edit
};

/**
 * set on save listener
 * @param lsn
 */
FormEditor.prototype.setOnSaveListener = function (lsn) {
    this.onSaveListener = lsn;
};

/**
 * on save button clicked
 */
FormEditor.prototype.onSave = function () {

    var self = this;

    if (this.shouldShowSaveButton()) {

        if (angular.isDefined(self.onSaveListener)) {

            self.onSaveListener(function () {
                self.status = FormEditor.status.READ_ONLY;

                //notify on status changed
                self.onStatusChanged();
            });

        } else {
            self.status = FormEditor.status.READ_ONLY;

            //notify on status changed
            self.onStatusChanged();
        }
    }
};


/**
 * set on delete listener
 * @param lsn
 */
FormEditor.prototype.setOnDeleteListener = function (lsn) {
    this.onDeleteListener = lsn;
};


/**
 * on delete button clicked
 */
FormEditor.prototype.onDelete = function () {

    var self = this;

    if (self.shouldShowDeleteButton()) {

        if (angular.isDefined(this.onDeleteListener)) {
            self.onDeleteListener(function () {
                //notify on status changed
                self.onStatusChanged();
            });
        } else {
            //notify on status changed
            self.onStatusChanged();
        }
    }
};

/**
 * create a roll back function that will COPY the rollback data and return it when cancel button is clicked
 * as a parameter of the invoked rollbackFunction
 *
 *
 * EXAMPLE:
 *
 * var myFormEditor = new FormEditor(FormEditor.READ_ONLY);
 * myFormEditor.setRollbackFunction({ //our controller binded data
 *     someObj: this.someObj,
 *     anotherObj: this.anotherObj
 * }, function(rollbackData){ //will be triggered when cancel form button was clicked with a copy of the rollback data originally sent
 *
 *      //change the changed binded data to a copy of the saved rollback data
 *      self.someObj = rollbackData.someObj;
 *      self.anotherObj = rollbackData.anotherObj;
 *
 * });
 *
 *
 * @param rollbackData
 * @param rollbackFunction
 */
FormEditor.prototype.setRollbackFunction = function (rollbackData, rollbackFunction) {

    var self = this;

    if (angular.isDefined(rollbackData) && angular.isDefined(rollbackFunction)) {

        self.rollbackData = angular.copy(rollbackData);

        self.addOnCancelEditListener(function (callback) {

            rollbackFunction(angular.copy(self.rollbackData));

            callback();
        });
    } else {
        throw Error("rollback data and rollback function must be provided");
    }

};