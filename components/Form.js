import LoadingScreen from './LoadingScreen';

const Form = ({
  handleSearch,
  shortLink,
  shortLinkOnEnter,
  valid,
  isShortening,
  onPaste
}) => (
  <div className="Form">
    <div className="container">
      <div className="col-sm-8 offset-sm-2">
        <div className="input-group input-one">
          <div className="input-group-prepend">
            <span
              aria-label="Emoji User"
              role="img"
              className="input-group-text"
            >
              <i className="fas fa-link" />
            </span>
          </div>

          <input
            disabled={isShortening}
            type="url"
            className="form-control input-link lg"
            onChange={handleSearch}
            onPaste={onPaste}
            onKeyDown={shortLinkOnEnter}
            placeholder="Digite ou cole o link"
          />

          <div className="input-group-addon input-group-append">
            <button
              className="btn btn-primary"
              disabled={!valid}
              onClick={shortLink}
            >
              Encurtar
            </button>
          </div>
        </div>

        {isShortening && <LoadingScreen />}
      </div>
    </div>
  </div>
);

export default Form;
