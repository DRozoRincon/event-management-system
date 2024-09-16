import { IsString, MaxLength, IsNotEmpty, IsDateString, IsNumber, IsEmail, IsNumberString, IsOptional, IsLatitude, IsLongitude } from 'class-validator';

export class EventDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    name: string;
    
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    description: string;

    @IsDateString()
    startDate: string;

    @IsDateString()
    endDate: string;

    @IsNumber()
    @IsLatitude()
    lat: number;

    @IsNumber()
    @IsLongitude()
    long: number;
}

export class EventUpdateDto{
    @IsNumber()
    id: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    @IsOptional()
    name: string;
    
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    @IsOptional()
    description: string;

    @IsDateString()
    @IsOptional()
    startDate: string;

    @IsDateString()
    @IsOptional()
    endDate: string;

    @IsNumber()
    @IsOptional()
    @IsLatitude()
    lat: number;

    @IsNumber()
    @IsOptional()
    @IsLongitude()
    long: number;
}

class AttendantDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    document: string;

    @IsString()
    @MaxLength(100)
    @IsEmail()
    email: string;

    @IsNumber()
    typeDocumentId: number;
}

export class AttendanceDto extends AttendantDto{
    @IsDateString()
    date: string;

    @IsNumber()
    eventId: number;
}

export class PaginationDto {
    @IsNumberString()
    page: string;

    @IsOptional()
    @IsString()
    filter: string;
}

export class DateRangeDto {
    @IsDateString()
    @IsOptional()
    startDate: string

    @IsDateString()
    @IsOptional()
    endDate: string
}