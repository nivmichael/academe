/**
 * Created by sergeisafrigin on 5/3/16.
 */
function InputEditor(formEditor, defaultStatus) {
    var self = this;

    this.formEditor = formEditor;

    this.status = angular.isDefined(defaultStatus) ? defaultStatus : InputEditor.status.READ_ONLY;

    this.onStatusChangedListeners = [];

    //get notified when form's status was changed
    this.formEditor.addOnStatusChangedListener(function(status) {

        self.status = InputEditor.status.READ_ONLY;

        self.onStatusChanged();
    });
}


/**
 * possible input statuses
 * @type {{EDIT: string, READ_ONLY: string}}
 */
InputEditor.status = {
    EDIT: "edit",
    READ_ONLY: "read"
};

/**
 * on status changed, notify all status changed listeners
 */
InputEditor.prototype.onStatusChanged = function() {
    this.onStatusChangedListeners.forEach(function(lsn) {
        if (angular.isDefined(lsn)) {
            lsn();
        }
    });
};

/**
 * add on status changed listener
 * @param lsn
 */
InputEditor.prototype.addOnStatusChangedListener = function(lsn) {
    this.onStatusChangedListeners.push(lsn);
};


/**
 * is form in editing mode
 * @returns {boolean}
 */
InputEditor.prototype.isEditing = function(withForm) {
    if (withForm !== true) {
        withForm = false;
    }

    return  this.status == InputEditor.status.EDIT || (withForm && this.formEditor.isEditing());
};


InputEditor.prototype.isReadOnly = function(withForm) {
    if (withForm !== true) {
        withForm = false;
    }

    return this.status == InputEditor.status.READ_ONLY && (!withForm || this.formEditor.isReadOnly());
};

InputEditor.prototype.shouldShowEditButton = function() {
    //TODO add listeners
    return this.isReadOnly(false);
};

InputEditor.prototype.shouldShowSaveButton = function() {
    //TODO add listeners
    return this.isEditing(false);
};

InputEditor.prototype.shouldShowCancelButton = function() {
    //TODO add listeners
    return this.isEditing(false);
};


InputEditor.prototype.shouldShowDeleteButton = function() {
    //TODO add listeners
    return this.status == InputEditor.status.EDIT;
};


InputEditor.prototype.onEdit = function() {
    this.status = InputEditor.status.EDIT;

    //notify that the status was changed
    this.onStatusChanged();

    //TODO handle edit
};


InputEditor.prototype.onSave = function() {
    this.status = InputEditor.status.READ_ONLY;

    //notify that the status was changed
    this.onStatusChanged();

    //TODO handle save
};


InputEditor.prototype.onCancelEdit = function() {
    this.status = InputEditor.status.READ_ONLY;

    //notify that the status was changed
    this.onStatusChanged();

    //TODO handle cancel edit
};
