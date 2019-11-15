export const DummyTrainer = props => {
  const { onBack, onSetPercent } = props
  return (
    <>
      <div className="container">
        <div className="heading">Wähle dein Ergebnis:</div>
        <button onClick={() => onBack()} key="-1">
          &lt;--- zurück
        </button>
        {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(p => (
          <button onClick={() => onSetPercent(p)} key={p}>
            {p} %
          </button>
        ))}
        <div />
        <div />
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          height: 100%;
        }
        .container button {
          width: 15em;
          margin: 0 auto;
        }
        .heading {
          text-align: center;
        }
      `}</style>
    </>
  )
}
