// estilização
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

// formulario
import { Controller, Control, FieldValues } from 'react-hook-form';

// navegação

interface PropsEmpresa {
    name: string,
    label: string,
    control: Control<FieldValues, any>
}

export default function InputEmpresa({ control, name, label }: PropsEmpresa) {
    return (
        <Box
            alignItems="center"
            m="40px 0px 0px 0px"
        >

            {/* Nome Fantasia */}
            <Controller
                control={control}
                name={name}
                render={({ field: { onChange, value } }) => (
                    <TextField
                        fullWidth
                        focused
                        onChange={onChange}
                        value={value}
                        label={label}
                    />
                )} />

        </Box>
    )
}