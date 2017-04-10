import expect from 'expect.js';
import { configurablePendingTasksReducer, pendingTasksReducer, actionKey, begin, end } from '../src/reducer';

describe('reducer', () => {
  describe('default', () => {
    it('should increase when a pending task starts', () => {
      expect(pendingTasksReducer(0, { [ actionKey ]: begin })).to.be(1);
      expect(pendingTasksReducer(12, { [ actionKey ]: begin })).to.be(13);
    });

    it('should decrease when a pending task ends', () => {
      expect(pendingTasksReducer(1, { [ actionKey ]: end })).to.be(0);
      expect(pendingTasksReducer(12, { [ actionKey ]: end })).to.be(11);

      expect(pendingTasksReducer).withArgs(0, { [ actionKey ]: end }).to.throwException(err => {
        expect(err).to.be.a(RangeError);
      });
    });
  });

  describe('configurable', () => {
    it('should increase when pending task starts on configured path', () => {
      const reducer = configurablePendingTasksReducer({ actionKeyPath: [ 'meta' ] });
      expect(reducer(0, { meta: { [ actionKey ]: begin } })).to.be(1);
      expect(reducer(41, { meta: { [ actionKey ]: begin } })).to.be(42);
    });

    it('should increase when pending task ends on configured path', () => {
      const reducer = configurablePendingTasksReducer({ actionKeyPath: [ 'meta' ] });
      expect(reducer(1, { meta: { [ actionKey ]: end } })).to.be(0);
      expect(reducer(22, { meta: { [ actionKey ]: end } })).to.be(21);

      expect(reducer).withArgs(0, { meta: { [ actionKey ]: end } }).to.throwException(err => {
        expect(err).to.be.a(RangeError);
      });
    });

    it('should ignore base-level pendingTasks when configured path', () => {
      const reducer = configurablePendingTasksReducer({ actionKeyPath: [ 'meta' ] });
      expect(reducer(0, { [ actionKey ]: begin })).to.be(0);
      expect(reducer(1, { [ actionKey ]: end })).to.be(1);
    });

    it('should increase/decrease on deeply configured paths', () => {
      const reducer = configurablePendingTasksReducer({ actionKeyPath: [ 'my', 'other', 'way' ] });
      expect(reducer(1, { my: { other: { way: { [ actionKey ]: begin } } } })).to.be(2);
      expect(reducer(4, { my: { other: { way: { [ actionKey ]: end } } } })).to.be(3);

      expect(reducer).withArgs(0, { my: { other: { way: { [ actionKey ]: end } } } }).to.throwException(err => {
        expect(err).to.be.a(RangeError);
      });
    });
  });
});
