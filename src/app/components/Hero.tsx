function Card() {
  return (
    <section className="w-full px-4 py-28">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-center text-2xl md:text-3xl font-bold mb-12">
          With your donation you will help UNFPA in its mission to:
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="w-20 h-20 bg-[#F47D31] rounded-full mx-auto mb-6 flex items-center justify-center">
              <svg className="w-10 h-10" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="12" fill="#F47D31" />
                <path
                  d="M12 7.5c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 5.5c-2.7 0-5.8 1.29-5.8 3.75V18h11.6v-1.25C17.8 14.29 14.7 13 12 13z"
                  fill="white"
                />
              </svg>
            </div>
            <p className="text-gray-800">
              Assure that no woman dies giving birth
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="w-20 h-20 bg-[#F47D31] rounded-full mx-auto mb-6 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19 3H5C3.89 3 3 3.89 3 5V19C3 20.11 3.89 21 5 21H19C20.11 21 21 20.11 21 19V5C21 3.89 20.11 3 19 3ZM17 13H7V11H17V13Z" />
              </svg>
            </div>
            <p className="text-gray-800">
              Provide access to modern contraceptives sufficient to benefit 20
              million women a year
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="w-20 h-20 bg-[#F47D31] rounded-full mx-auto mb-6 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M16 4c0-1.11.89-2 2-2s2 .89 2 2-.89 2-2 2-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63C19.68 7.55 18.92 7 18.06 7h-.12c-.86 0-1.63.55-1.9 1.37l-.86 2.58c1.08.6 1.82 1.73 1.82 3.05v8h3zm-7.5-10.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5zM5.5 6c1.11 0 2-.89 2-2s-.89-2-2-2-2 .89-2 2 .89 2 2 2zm2 16v-7H9V9c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v6h1.5v7h4zm6.5 0v-4h1v-4c0-.82-.68-1.5-1.5-1.5h-2c-.82 0-1.5.68-1.5 1.5v4h1v4h3z" />
              </svg>
            </div>
            <p className="text-gray-800">
              End violence against women, female genital mutilation, child
              marriage and teen pregnancies
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Card;
