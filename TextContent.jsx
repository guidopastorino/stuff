const TextContent = ({ text }) => {
    const [truncated, setTruncated] = useState(true);

    const toggleTruncate = (e) => {
        e.preventDefault();
        setTruncated(!truncated);
    };

    // @params
    // truncateText(<text>, <wordLimit>)
    const truncateText = (text, limit) => {
        if (text.length <= limit) {
            return text;
        }
        return text.slice(0, limit) + '...';
    };

    const renderShowLink = () => {
        if (truncated) {
            return (
                <span className='text-blue-600 hover:underline inline-block ml-1.5' onClick={(e) => toggleTruncate(e)}>
                    Show more
                </span>
            );
        } else {
            return (
                <span className='text-blue-600 hover:underline inline-block ml-1.5' onClick={(e) => toggleTruncate(e)}>
                    Show less
                </span>
            );
        }
    };


    return (
        <div className='mt-2 overflow-hidden break-all'>
            {truncated ? (
                <span>{truncateText(text, 200)}</span>
            ) : (
                <span>{text}</span>
            )}
            {text.length > 200 && renderShowLink()}
        </div>
    );
};