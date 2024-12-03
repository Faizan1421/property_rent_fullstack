const Location = () => {
  return (
    <div className="google-map-code">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d834.0491205802083!2d73.298907!3d33.2613481!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x392005005ede4c9d%3A0x80475a8b94377a99!2sGreen%20Solar%20Mall!5e0!3m2!1sen!2s!4v1732702406944!5m2!1sen!2s"
        height="250"
        // frameBorder="0"
        style={{ border: 0 }}
        aria-hidden="false"
        tabIndex="0"
        className="google-map w-full px-5 laptop:px-20"
      />
    
    </div>
  );
};

export default Location;
