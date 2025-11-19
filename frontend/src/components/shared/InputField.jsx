const InputField = ({
    label,
    id,
    type,
    errors,
    register,
    required,
    message,
    className,
    min,
    value,
    placeholder
}) => {
    return (
        <div className="flex flex-col gap-1 w-full">
            <label htmlFor="id" className={`${
                className ? className : ""
            } font-semibold text-sm text-slate-800`}>
            {label}
            </label>
            <input
                type={type}
                id={id}
                placeholder={placeholder}
                className={`${
                    className ? className : ""    
                } px2 py2 border outline-none bg-transparent text-slate-800 rounded-md`}
                {...register(id, {
                    required: {value: required, message},
                    minLength: min ? {value: min, message: `Minimum ${min} characters is needed"`}
                    : null
                })}
            ></input>
        </div>
    );
};