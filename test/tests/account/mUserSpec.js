describe('mUser', function() {
    beforeEach(module('app'));

    describe('isAdmin', function() {
        it('should return false if the roles array does not have an admin array', inject(function(mUser) {
            var user = new mUser();
            user.roles = ['not admin'];
            expect(user.isAdmin()).to.be.falsey;
        }));
        it('should return true if the roles array has an admin entry', inject(function(mUser) {
            var user = new mUser();
            user.roles = ['admin'];
            expect(user.isAdmin()).to.be.true;
        }))
    })
});